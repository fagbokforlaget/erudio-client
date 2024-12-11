import {
  HttpClientProxy,
  HttpClientProxyError,
} from '../utils/http-client-proxy';
import { StructureLink as StructureLinkDto } from './dto/structure-link';

export class StructureLink {
  private url: string;

  constructor(host: string) {
    this.url = `http://edtech-structure-link-service${host}/structures/links`;
  }

  public async listStructureLinks(
    options?: Partial<StructureLinkDto>,
  ): Promise<StructureLinkDto[]> {
    return await new HttpClientProxy().get<StructureLinkDto[]>(this.url, {
      params: options,
    });
  }

  public async getOne(id: string): Promise<StructureLinkDto> {
    const response = await new HttpClientProxy().get<StructureLinkDto[]>(
      this.url,
      {
        params: { id },
      },
    );

    if (!response.length) {
      throw {
        message: 'Request failed with status code 404',
        status: 404,
        data: undefined,
      } as HttpClientProxyError;
    }
    return response.pop();
  }
}
