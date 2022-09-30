import {
  PaginatedNodes,
  Node,
  StructureNode,
  Options,
} from './structure/dto/paginated-nodes-dto';
import { Contents } from './content-fusion/dto/content-node-dto';
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
    namespace: string,
    structureId: string,
    locale?: string,
  ): Promise<StructureNode> => {
    const structure: Node = await new Structure(this.host).getSingleNode(
      namespace,
      structureId,
    );
    let structureContents: Contents;
    if (structure.contentId) {
      structureContents = await new ContentFusion(this.host).getStructureNode(
        structure.contentId,
        locale,
      );
    }
    const nodeList = await new Structure(this.host).listchildren(
      namespace,
      structureId,
    );
    const nodeListWithContent: Node[] = [];
    for (const node of nodeList.data) {
      if (node.contentId) {
        const content: Contents = await new ContentFusion(
          this.host,
        ).getStructureNode(node.contentId, locale);
        nodeListWithContent.push({ ...node, contents: content });
      }
    }
    return <StructureNode>{
      ...structure,
      contents: structureContents,
      children: nodeListWithContent,
    };
  };
}
