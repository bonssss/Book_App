import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

export const fetchBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBook = async (bookData) => {
  const response = await axios.post(API_URL, bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await axios.put(`${API_URL}/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
