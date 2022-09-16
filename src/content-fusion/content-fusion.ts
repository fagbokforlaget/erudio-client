import { HttpClientProxy } from '../utils/http-client-proxy';
import { ContentNode } from './dto/content-node-dto';

export class ContentFusion {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-content-fusion-service.${host}`;
  }

  public async getStructureNode(
    structureId: string,
    locale?: string,
  ): Promise<ContentNode> {
    const url = `${this.baseUrl}/content/${structureId}`;
    const res = await new HttpClientProxy().get<ContentNode>(url);
    if (locale) {
      const localization = res.localization[locale];
      res.localization = {};
      res.localization[locale] = localization;
    }
    return res;
  }
}
