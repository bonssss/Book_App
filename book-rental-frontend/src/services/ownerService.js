import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ensure this matches your backend URL

export const fetchOwnerStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/owner-stats`);
    console.log('fetched data:',response)
    return response.data;
  } catch (error) {
    console.error('Error fetching owner stats:', error);
    throw error;
  }
};
export const approveOwner = async (id) => {
  const token = localStorage.getItem('token'); // Ensure the token is set
  try {
    const response = await axios.put(`${API_URL}/api/admin/approve-owner/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error approving owner:', error.response?.data?.error || error.message);
    throw error;
  }
};


export const deleteOwner = async (id) => {
  const token = localStorage.getItem('token'); // Ensure the token is set
  try {
    const response = await axios.delete(`${API_URL}/api/admin/delete-owner/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting owner:', error.response?.data?.error || error.message);
    throw error;
  }
};
export const updateOwnerStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/status/${id}`, { status });
  return response.data;
};