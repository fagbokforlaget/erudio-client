import { apiClient } from '../erudio';
import { ContentNode } from '../content-fusion/dto/structure-node-output.dto';
import { AxiosResponse } from 'axios';

export class ContentFusion {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-content-fusion-service.${host}`;
  }

  public async getStructureNode(
    structureId: string,
    locale?: string,
  ): Promise<AxiosResponse<ContentNode, any>> {
    const url = `${this.baseUrl}/content/${structureId}/`;
    const res = await apiClient.get<ContentNode>(url);
    if (locale) {
      const localization = res.data.localization[locale];
      res.data.localization = {};
      res.data.localization[locale] = localization;
    }
    return res;
  }
}
