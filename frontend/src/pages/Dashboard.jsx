import React, { useState, useEffect } from "react";
import MeetingForm from "../components/MeetingForm";
import MeetingList from "../components/MeetingList";
import AvailableSlots from "../components/AvailableSlots"; // Add the AvailableSlots component
import { getMeetings, deleteMeeting } from "../api/meetings";

const Dashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId] = useState("1"); // Example userId, change based on your user system

  useEffect(() => {
    const fetchMeetings = async () => {
      const data = await getMeetings();
      setMeetings(data.meetings);
    };
    fetchMeetings();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this meeting?");
    if (isConfirmed) {
      try {
        await deleteMeeting(id);
        setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));
      } catch (error) {
        console.error("Error deleting meeting:", error);
      }
    }
  };

  const handleSuccess = () => {
    setEditingMeeting(null);
    setIsModalOpen(false);
    const fetchMeetings = async () => {
      const data = await getMeetings();
      setMeetings(data.meetings);
    };
    fetchMeetings();
  };

  const handleEdit = (meeting) => {
    setEditingMeeting(meeting);
    setIsModalOpen(true);
  };

  const handleSchedule = () => {
    setEditingMeeting(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSchedule}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-600 transition duration-300"
      >
        Schedule Meeting
      </button>

      <MeetingForm
        meeting={editingMeeting}
        onSuccess={handleSuccess}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Available Slots Section */}
      <div className="mt-8">
        <h2 className="text-xl mb-4 font-semibold">Check Available Slots</h2>
        <AvailableSlots userId={userId} />
      </div>

      {/* Conditional Rendering: No Meetings Message */}
      {meetings.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">
          <p>No meetings scheduled at the moment.</p>
        </div>
      ) : (
        <MeetingList
          meetings={meetings}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
