import axios from 'axios';

const api = axios.create({
  baseURL: 'https://instacharterapp-server-cgfqgug5f2fsaeag.centralus-01.azurewebsites.net/api/',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'instacharter@2025',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject({ message: errorMessage, ...error.response });
  }
);

export default api;
