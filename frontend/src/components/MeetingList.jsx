import React from "react";

const MeetingList = ({ meetings, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl mb-4">Scheduled Meetings</h2>
      {meetings.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No scheduled meetings at the moment.</p>
        </div>
      ) : (
        meetings.map((meeting) => (
          <div key={meeting.id} className="border p-4 mb-2 rounded shadow-sm">
            <h3 className="text-lg">{meeting.title || "Untitled Meeting"}</h3>
            <p>{`${meeting.date} at ${meeting.time}`}</p>
            <p>Duration: {meeting.duration} minutes</p>
            <p>Description: {meeting.description}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(meeting)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(meeting.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MeetingList;
