import axios from 'axios';

const config = require('../erudio-client.json');

export function sleep(ms = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const apiClient = axios.create({
  baseURL: config.erudio_base_url,
  headers: {
    Authorization: `Bearer ${config.erudio__access_token}`,
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
