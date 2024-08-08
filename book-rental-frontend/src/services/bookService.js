import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

// Create an axios instance with base URL and headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchBooks = async () => {
  const response = await axiosInstance.get('/');
  return response.data;
};

export const addBook = async (bookData, file) => {
  const formData = new FormData();
  for (const key in bookData) {
    formData.append(key, bookData[key]);
  }
  if (file) {
    formData.append('file', file);
  }

  const response = await axiosInstance.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateBook = async (id, bookData, file) => {
  const formData = new FormData();
  for (const key in bookData) {
    formData.append(key, bookData[key]);
  }
  if (file) {
    formData.append('file', file);
  }

  const response = await axiosInstance.put(`/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};
