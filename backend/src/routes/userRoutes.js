const express = require("express");
const { getAvailableSlots } = require("../controllers/userController");

const router = express.Router();

router.get("/:userId/available-slots", getAvailableSlots);

module.exports = router;
