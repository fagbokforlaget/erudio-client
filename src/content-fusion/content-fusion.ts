import { apiClient } from '../erudio';
import { StructureNodeOutputDto } from '../content-fusion/dto/structure-node-output.dto';

export class ContentFusion {
  private base_url: string;

  constructor(base_url: string) {
    this.base_url = base_url;
  }

  public async getNode(structure_id: string, locale: string): Promise<any> {
    const url = this.base_url + `/content/${structure_id}/`;
    try {
      const res: StructureNodeOutputDto = await apiClient.get(url);
      if (locale) {
        const localization = res.localization[locale];
        res.localization = {};
        res.localization[locale] = localization;
      }
    } catch (error) {
      return error;
    }
  }
}
