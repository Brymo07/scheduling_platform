const express = require("express");
const meetingRoutes = require("./meetingRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/meetings", meetingRoutes);
router.use("/users", userRoutes);

module.exports = router;
