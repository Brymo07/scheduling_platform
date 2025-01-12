const moment = require('moment');

// Simulating a mock database of meetings with start and end times for each user
let meetings = [
  { userId: "1", startTime: "2025-01-12T09:00:00", endTime: "2025-01-12T10:00:00" },
  { userId: "1", startTime: "2025-01-12T02:00:00", endTime: "2025-01-12T03:00:00" },
  { userId: "2", startTime: "2025-01-12T11:00:00", endTime: "2025-01-12T12:00:00" },
  { userId: "2", startTime: "2025-01-12T01:00:00", endTime: "2025-01-12T02:00:00" },
];

// Function to get available slots for a user, checking for conflicts
const getAvailableSlots = (req, res) => {
  const { userId } = req.params;
  const { date, duration } = req.query; // date and duration in hours

  if (!date || !duration) {
    return res.status(400).json({ error: "Date and duration are required" });
  }

  const durationInMillis = parseInt(duration) * 60 * 60 * 1000; // convert duration from hours to milliseconds

  // Predefined mock available slots (can be modified for dynamic availability)
  const mockAvailability = {
    "1": ["09:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"],
    "2": ["11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
  };

  const availableSlots = mockAvailability[userId] || [];

  // Convert the date string to a Date object for calculations
  const selectedDate = moment(date, "YYYY-MM-DD").startOf("day"); // Start at 12:00 AM

  // Filter out slots that are already taken by scheduled meetings
  const userMeetings = meetings.filter(
    (meeting) => meeting.userId === userId && moment(meeting.startTime).isSameOrAfter(selectedDate)
  );

  // Available time slots array
  let finalAvailableSlots = [];

  // Iterate over the predefined available slots and check against user meetings
  availableSlots.forEach((slot) => {
    // Create a moment object for the start time of the slot
    const slotStartTime = moment(`${date} ${slot}`, "YYYY-MM-DD hh:mm A");

    // Check if this slot conflicts with any existing meeting
    const isConflicting = userMeetings.some(
      (meeting) =>
        moment(meeting.startTime).isBefore(slotStartTime.clone().add(durationInMillis, "milliseconds")) &&
        moment(meeting.endTime).isAfter(slotStartTime)
    );

    // If no conflict, add to available slots
    if (!isConflicting) {
      finalAvailableSlots.push(slotStartTime.format("hh:mm A"));
    }
  });

  // Return available slots for the user
  res.status(200).json({ userId, availableSlots: finalAvailableSlots });
};

module.exports = { getAvailableSlots };
