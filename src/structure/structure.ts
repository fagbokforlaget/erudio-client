import { HttpClientProxy } from '../utils/http-client-proxy';
import { Node, Options, PaginatedNodes } from './dto/paginated-nodes-dto';

export class Structure {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-structure-service${host}`;
  }

  public async getSingleNode(
    namespace: string,
    structure_id: string,
  ): Promise<Node> {
    const url = `${this.baseUrl}/structures/${namespace}/nodes/${structure_id}`;
    return await new HttpClientProxy().get<Node>(url);
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

  public async listChildren(
    namespace: string,
    structureId: string,
  ): Promise<PaginatedNodes<Node>> {
    const url = `${this.baseUrl}/structures/${namespace}/children/nodes/${structureId}`;
    return await new HttpClientProxy().get<PaginatedNodes<Node>>(url);
  }
}
