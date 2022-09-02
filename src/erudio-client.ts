import { FindByNamespaceOutputDto } from './structure/dto/find-by-namespace-output.dto';
import { StructureNodeOutputDto } from './content-fusion/dto/structure-node-output.dto';
import { Structure, Options } from './structure/structure';
import { ContentFusion } from './content-fusion/content-fusion';

export class ErudioClient {
  private base_url: string;

  constructor(base_url: string) {
    this.base_url = base_url;
  }

  public getStructures = async (
    namespace: string,
    options: Options,
  ): Promise<FindByNamespaceOutputDto> => {
    return new Structure(this.base_url).listNodes(namespace, options);
  };

  public getStructureNode = async (
    structure_id: string,
    locale: string,
  ): Promise<StructureNodeOutputDto> => {
    return new ContentFusion(this.base_url).getNode(structure_id, locale);
  };
}
