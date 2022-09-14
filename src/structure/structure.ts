import { AxiosResponse } from 'axios';
import { apiClient } from '../erudio';
import { Node, PaginatedNodes } from './dto/find-by-namespace-output.dto';

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

  public async listNodes(
    namespace: string,
    options?: Options,
  ): Promise<AxiosResponse<PaginatedNodes<Node>, any>> {
    const url = `${this.baseUrl}/structures/${namespace}/nodes/`;
    const res = await apiClient.get<PaginatedNodes<Node>>(url, {
      params: options,
    });
    return res;
  }
}
