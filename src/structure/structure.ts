import { apiClient } from '../erudio';

export interface Options {
  filter?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export class Structure {
  private base_url: string;

  constructor(host: string) {
    this.base_url = `http://edtech-structure-service.${host}`;
  }

  public async listNodes(namespace: string, options?: Options): Promise<any> {
    const url = this.base_url + `/structures/${namespace}/nodes/`;
    return await apiClient.get(url, { params: options });
  }
}
