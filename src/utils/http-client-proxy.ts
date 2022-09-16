import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export function sleep(ms = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class HttpClientProxy {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.apiClient.interceptors.request.use(
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
  }
  async get<T>(url: string, config?: AxiosRequestConfig<any>) {
    try {
      const response = await this.apiClient.get(url, config);
      return response.data;
    } catch (e) {
      throw {
        message: e.message,
        status: e.response.status,
      };
    }
  }
}
