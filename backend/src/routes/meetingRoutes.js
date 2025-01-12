const express = require("express");
const {
  createMeeting,
  getMeetings,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

const router = express.Router();

// Create a new meeting
router.post("/", createMeeting);

// Get all meetings 
router.get("/", getMeetings);

// Update a meeting
router.put("/:meetingId", updateMeeting);

// Delete a meeting
router.delete("/:meetingId", deleteMeeting);

module.exports = router;
