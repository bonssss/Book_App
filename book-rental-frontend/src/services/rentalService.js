import axios from 'axios';

export const rentBooks = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/rent-books', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const verifyRental = async (rentalId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/verify-rental/${rentalId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const returnBook = async (rentalId) => {
  try {
    const response = await axios.post('http://localhost:5000/api/return-book', { rentalId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
