import { PaginatedNodes, Options } from './structure/dto/paginated-nodes-dto';
import {
  Contents,
  ContentNode,
  StructureNode,
} from './content-fusion/dto/content-node-dto';
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
  ): Promise<PaginatedNodes<ContentNode>> => {
    return new Structure(this.host).listNodes(namespace, options);
  };

  public getStructureNode = async (
    namespace: string,
    structureId: string,
    locale?: string,
  ): Promise<StructureNode> => {
    const structure: ContentNode = await new Structure(this.host).getSingleNode(
      namespace,
      structureId,
    );
    const structureContents: Contents = await new ContentFusion(
      this.host,
    ).getStructureNode(structureId, locale);
    const nodeList = await new Structure(this.host).listchildren(structureId);
    let nodeListWithContent: ContentNode[];
    for (let node of nodeList.data) {
      const content: Contents = await new ContentFusion(
        this.host,
      ).getStructureNode(node.contentId, locale);
      if (nodeListWithContent) {
        nodeListWithContent.push({ ...node, contents: content });
      } else {
        nodeListWithContent = [{ ...node, contents: content }];
      }
    }
    return <StructureNode>{
      ...structure,
      contents: structureContents,
      children: nodeListWithContent,
    };
  };
}
