import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const originalData = config.data || {};

  config.data = {
    timestamp: new Date().toISOString(),
    data: originalData,
  };

  return config;
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
