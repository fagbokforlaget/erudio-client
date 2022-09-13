import { apiClient } from '../erudio';

export interface Options {
  filter?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export class Structure {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-structure-service.${host}`;
  }

  public async listNodes(namespace: string, options?: Options): Promise<any> {
    const url = `${this.baseUrl}/structures/${namespace}/nodes/`;
    return await apiClient.get(url, { params: options });
  }
}
