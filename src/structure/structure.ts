import { Node, PaginatedNodes, Options } from './dto/paginated-nodes-dto';
import { HttpClientProxy } from '../utils/http-client-proxy';

export class Structure {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-structure-service.${host}`;
  }

  public async listNodes(
    namespace: string,
    options?: Options,
  ): Promise<PaginatedNodes<Node>> {
    const url = `${this.baseUrl}/structures/${namespace}/nodes`;
    return await new HttpClientProxy().get<PaginatedNodes<Node>>(url, {
      params: options,
    });
  }
}
