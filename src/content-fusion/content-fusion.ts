import { apiClient } from '../erudio';
import { StructureNodeOutputDto } from '../content-fusion/dto/structure-node-output.dto';

export class ContentFusion {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-content-fusion-service.${host}`;
  }

  public async getStructureNode(
    structureId: string,
    locale: string,
  ): Promise<any> {
    const url = `${this.baseUrl}/content/${structureId}/`;
    const res: StructureNodeOutputDto = await apiClient.get(url);
    if (locale) {
      const localization = res.localization[locale];
      res.localization = {};
      res.localization[locale] = localization;
    }
    return res;
  }
}
