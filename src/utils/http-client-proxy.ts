import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export interface HttpClientProxyError {
  message: string;
  status?: number;
  data?: any;
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
        if (
          config.method === 'put' ||
          config.method === 'post' ||
          config.method === 'patch' ||
          config.method === 'delete'
        ) {
          await delay(1000);
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
      const response = await this.apiClient.get<T>(url, config);
      return response.data;
    } catch (e) {
      throw <HttpClientProxyError>{
        message: e.message,
        status: e.response?.status,
        data: e.response?.data,
      };
    }
  }
}
