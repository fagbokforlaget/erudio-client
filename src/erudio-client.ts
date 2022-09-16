import { Node, PaginatedNodes } from './structure/dto/paginated-nodes-dto';
import { ContentNode } from './content-fusion/dto/content-node-dto';
import { Structure, Options } from './structure/structure';
import { ContentFusion } from './content-fusion/content-fusion';

export class ErudioClient {
  private host: string;

  constructor(host: string) {
    this.host = host;
  }

  public getStructures = async (
    namespace: string,
    options?: Options,
  ): Promise<PaginatedNodes<Node>> => {
    return new Structure(this.host).listNodes(namespace, options);
  };

  public getStructureNode = async (
    structureId: string,
    locale?: string,
  ): Promise<ContentNode> => {
    return new ContentFusion(this.host).getStructureNode(structureId, locale);
  };
}
