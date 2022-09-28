import { PaginatedNodes, Options } from './dto/paginated-nodes-dto';
import { ContentNode } from '../content-fusion/dto/content-node-dto';
import { HttpClientProxy } from '../utils/http-client-proxy';

export class Structure {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-structure-service.${host}`;
  }

  public async getSingleNode(
    namespace: string,
    structure_id: string,
  ): Promise<ContentNode> {
    const url = `${this.baseUrl}/structures/${namespace}/nodes/${structure_id}`;
    return await new HttpClientProxy().get<ContentNode>(url);
  }

  public async listNodes(
    namespace: string,
    options?: Options,
  ): Promise<PaginatedNodes<ContentNode>> {
    const url = `${this.baseUrl}/structures/${namespace}/nodes`;
    return await new HttpClientProxy().get<PaginatedNodes<ContentNode>>(url, {
      params: options,
    });
  }

  public async listchildren(
    structureId: string,
  ): Promise<PaginatedNodes<ContentNode>> {
    const url = `${this.baseUrl}/structures/children/nodes/${structureId}`;
    return await new HttpClientProxy().get<PaginatedNodes<ContentNode>>(url);
  }
}
