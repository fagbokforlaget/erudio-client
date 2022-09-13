import { FindByNamespaceOutputDto } from './structure/dto/find-by-namespace-output.dto';
import { StructureNodeOutputDto } from './content-fusion/dto/structure-node-output.dto';
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
  ): Promise<FindByNamespaceOutputDto> => {
    return new Structure(this.host).listNodes(namespace, options);
  };

  public getStructureNode = async (
    structureId: string,
    locale: string,
  ): Promise<StructureNodeOutputDto> => {
    return new ContentFusion(this.host).getStructureNode(structureId, locale);
  };
}
