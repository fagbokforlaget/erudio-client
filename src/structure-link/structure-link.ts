import { HttpClientProxy } from '../utils/http-client-proxy';
import { StructureLinkDto } from './dto/structure-link-dto';

export class StructureLink {
  private url: string;

  constructor(host: string) {
    this.url = `http://edtech-structure-link-service.${host}/structures/links`;
  }

  public async listStructureLinks(
    options?: Partial<StructureLinkDto>,
  ): Promise<StructureLinkDto[]> {
    return await new HttpClientProxy().get<StructureLinkDto[]>(this.url, {
      params: options,
    });
  }

  public async getOne(id: string): Promise<StructureLinkDto> {
    return (
      await new HttpClientProxy().get<StructureLinkDto[]>(this.url, {
        params: { id },
      })
    ).pop();
  }
}
