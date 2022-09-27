import {
  Node,
  PaginatedNodes,
  Options,
} from './structure/dto/paginated-nodes-dto';
import { ContentNode } from './content-fusion/dto/content-node-dto';
import { Structure } from './structure/structure';
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
  ): Promise<Array<ContentNode>> => {
    const nodeList = await new Structure(this.host).listchildren(structureId);
    console.log(nodeList);
    let nodeListWithContent: ContentNode[];
    nodeList.data.forEach(async (node) => {
      const content = await new ContentFusion(this.host).getStructureNode(
        node.id,
        locale,
      );
      if (nodeListWithContent) {
        nodeListWithContent.push(content);
      } else {
        nodeListWithContent = [content];
      }
      console.log(nodeListWithContent);
    });
    return nodeListWithContent;
  };
}
