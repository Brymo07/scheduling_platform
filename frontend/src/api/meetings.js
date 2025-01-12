import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const createMeeting = async (meetingData) => {
  const response = await axios.post(`${BASE_URL}/api/meetings`, meetingData);
  return response.data;
};

export const getMeetings = async () => {
  const response = await axios.get(`${BASE_URL}/api/meetings`);
  return response.data;
};

export const updateMeeting = async (meetingId, meetingData) => {
  const response = await axios.put(`${BASE_URL}/api/meetings/${meetingId}`, meetingData);
  return response.data;
};

export const deleteMeeting = async (meetingId) => {
  const response = await axios.delete(`${BASE_URL}/api/meetings/${meetingId}`);
  return response.data;
};

export const getAvailableSlots = async (userId, date, duration) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${userId}/available-slots`, {
      params: { date, duration },
    });
    return response.data.availableSlots;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};
