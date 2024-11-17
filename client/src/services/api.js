import axios from 'axios';

const API_URL = 'https://admin-dashboard-ab6k.onrender.com/api/auth'; // Adjust based on your backend URL

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register
export const register = async (data) => {
  const response = await apiClient.post('/register', data);
  return response.data;
};

// Login
export const login = async (data) => {
  const response = await apiClient.post('/login', data);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (data) => {
  const response = await apiClient.post('/forgot-password', data);
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await apiClient.post('/reset-password', data);
  return response.data;
};
