import axios from 'axios';

export function sleep(ms = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    // rate limit erudio api
    // adds artificial sleep
    if (config.method === 'PUT' || config.method === 'POST') {
      await sleep();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
