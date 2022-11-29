import {
  PaginatedNodes,
  Node,
  StructureNode,
  Options,
} from './structure/dto/paginated-nodes-dto';
import { Contents } from './content-fusion/dto/content-node-dto';
import { Structure } from './structure/structure';
import { ContentFusion } from './content-fusion/content-fusion';
import { TagObject } from './tag/dto/tag.dto';
import { TagService } from './tag/tag';
import { ServiceType } from './utils/service.types';
import { StructureLinkDto } from './structure-link/dto/structure-link-dto';
import { StructureLink } from './structure-link/structure-link';

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

  public getStructureNodes = async (
    options: Partial<StructureLinkDto>,
  ): Promise<StructureLinkDto[]> => {
    return new StructureLink(this.host).listStructureLinks(options);
  };

  public getLinkedStructure = async (
    linkId: string,
    locale?: string,
  ): Promise<StructureNode> => {
    const link: StructureLinkDto = await new StructureLink(this.host).getOne(
      linkId,
    );

    const node = await this.getStructureNode(
      link.sourceNamespaceId,
      link.sourceId,
      locale,
    );

    const tags = await this.getTags(ServiceType.LINK, linkId);

    return { ...node, tags: tags?.tags || [] };
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

    const nodeList = await new Structure(this.host).listChildren(
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

    let parentStructureTags: TagObject | undefined;
    try {
      parentStructureTags = await this.getTags(
        ServiceType.STRUCTURE,
        structureId,
      );
    } catch (e) {
      console.log(`Tags for ${structureId} not found`);
    }

    return <StructureNode>{
      ...structure,
      contents: structureContents,
      children: nodeListWithContent,
      tags: parentStructureTags?.tags || [],
    };
  };

  public getTags = async (
    serviceType: ServiceType,
    objectId: string,
  ): Promise<TagObject> => {
    return await new TagService(this.host).getTagObject(serviceType, objectId);
  };
}
