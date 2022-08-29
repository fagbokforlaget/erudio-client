import { apiClient } from '../erudio';

export interface Options {
  filter?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export class Structure {
  private base_url = 'http://edtech-structure-service.dev.svc.cluster.local';

  public async listNodes(namespace: string, options?: Options): Promise<any> {
    const url = this.base_url + `/structures/${namespace}/nodes/`;
    try {
      const res = await apiClient.get(url, { params: options });
      return res.data;
    } catch (error) {
      console.error(`${error.response.path} -> ${error.response.status}`);
    }
  }
}
