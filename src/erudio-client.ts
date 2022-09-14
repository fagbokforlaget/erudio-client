import {
  Node,
  PaginatedNodes,
} from './structure/dto/find-by-namespace-output.dto';
import { ContentNode } from './content-fusion/dto/structure-node-output.dto';
import { Structure, Options } from './structure/structure';
import { ContentFusion } from './content-fusion/content-fusion';
import { AxiosResponse } from 'axios';

export class ErudioClient {
  private host: string;

  constructor(host: string) {
    this.host = host;
  }

  public getStructures = async (
    namespace: string,
    options?: Options,
  ): Promise<AxiosResponse<PaginatedNodes<Node>, any>> => {
    return new Structure(this.host).listNodes(namespace, options);
  };

  public getStructureNode = async (
    structureId: string,
    locale?: string,
  ): Promise<AxiosResponse<ContentNode, any>> => {
    return new ContentFusion(this.host).getStructureNode(structureId, locale);
  };
}
