const { v4: uuidv4 } = require("uuid");

const { getDbConnection } = require("../models/db");

const createMeeting = async (req, res) => {
  const { date, time, duration, participants, title, description } = req.body;

  if (!date || !time || !duration || !participants || participants.length < 2) {
    return res.status(400).json({ error: "Invalid meeting details" });
  }

  try {
    const db = getDbConnection();
    const [result] = await db.execute(
      "INSERT INTO Meetings (date, time, duration, title, description, participants) VALUES (?, ?, ?, ?, ?, ?)",
      [date, time, duration, title, description, JSON.stringify(participants)]
    );

    // Simulate notification
    console.log(`Notification: Meeting scheduled with ID ${result.insertId}`);

    res.status(201).json({ message: "Meeting created successfully", id: result.insertId });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Failed to create meeting" });
  }
};

const getMeetings = async (req, res) => {
  try {
    const db = getDbConnection();
    const [meetings] = await db.execute("SELECT * FROM Meetings");

    res.status(200).json({ meetings });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Failed to fetch meetings" });
  }
};

const updateMeeting = async (req, res) => {
  const { meetingId } = req.params;
  const { date, time, duration, title, description } = req.body;

  try {
    const db = getDbConnection();
    const [result] = await db.execute(
      "UPDATE Meetings SET date = ?, time = ?, duration = ?, title = ?, description = ? WHERE id = ?",
      [date, time, duration, title, description, meetingId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    console.log(`Notification: Meeting with ID ${meetingId} updated`);

    res.status(200).json({ message: "Meeting updated successfully" });
  } catch (error) {
    console.error("Error updating meeting:", error);
    res.status(500).json({ error: "Failed to update meeting" });
  }
};

const deleteMeeting = async (req, res) => {
  const { meetingId } = req.params;

  try {
    const db = getDbConnection();
    const [result] = await db.execute("DELETE FROM Meetings WHERE id = ?", [meetingId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    console.log(`Notification: Meeting with ID ${meetingId} canceled`);

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ error: "Failed to delete meeting" });
  }
};

module.exports = { createMeeting, getMeetings, updateMeeting, deleteMeeting };
