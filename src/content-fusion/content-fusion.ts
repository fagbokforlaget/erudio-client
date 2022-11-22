import {
  HttpClientProxy,
  HttpClientProxyError,
} from '../utils/http-client-proxy';
import { Contents } from './dto/content-node-dto';

export class ContentFusion {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-content-fusion-service.${host}`;
  }

  public async getStructureNode(
    contentId: string,
    locale?: string,
  ): Promise<Contents> {
    const url = `${this.baseUrl}/content/${contentId}`;
    const res = await new HttpClientProxy().get<Contents>(url);
    if (locale) {
      if (res?.localization?.[locale]) {
        const localization = res.localization[locale];
        res.localization = {};
        res.localization[locale] = localization;
      } else {
        throw <HttpClientProxyError>{
          message: 'Request failed with status code 404',
          status: 404,
        };
      }
    }
    return res;
  }
}
