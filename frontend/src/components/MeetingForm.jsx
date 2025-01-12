import React, { useState, useEffect } from "react";
import { createMeeting, updateMeeting } from "../api/meetings";

const MeetingForm = ({ meeting, onSuccess, isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    title: "",
    description: "",
    participants: [],
  });

  useEffect(() => {
    if (meeting) {
      setFormData({
        date: meeting.date || "",
        time: meeting.time || "",
        duration: meeting.duration || "",
        title: meeting.title || "",
        description: meeting.description || "",
        participants: Array.isArray(meeting.participants) ? meeting.participants : [],
      });
    }
  }, [meeting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleParticipantsChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      participants: value.split(",").map((p) => p.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (meeting?.id) {
        await updateMeeting(meeting.id, formData);
      } else {
        await createMeeting(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving meeting:", error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6">
              {meeting?.id ? "Update Meeting" : "Schedule Meeting"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-600 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-600 mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Participants (comma-separated emails)</label>
                <input
                  type="text"
                  name="participants"
                  value={formData.participants.join(", ")}
                  onChange={handleParticipantsChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {meeting?.id ? "Update" : "Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingForm;
