import React, { useState, useEffect } from "react";
import { getAvailableSlots } from "../api/meetings";

const AvailableSlots = ({ userId }) => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date && duration) {
      setLoading(true);
      getAvailableSlots(userId, date, duration)
        .then((fetchedSlots) => {
          setSlots(fetchedSlots);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching available slots:", error);
          setLoading(false);
        });
    }
  }, [date, duration, userId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">Duration (in hours):</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-blue-500">Loading available slots...</p>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">Available Slots:</h3>
          <ul className="list-disc pl-5">
            {slots.length > 0 ? (
              slots.map((slot, index) => <li key={index} className="text-gray-700">{slot}</li>)
            ) : (
              <p className="text-red-500">No available slots for this date and duration.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvailableSlots;
