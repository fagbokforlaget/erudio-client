import { HttpClientProxy } from '../utils/http-client-proxy';
import { LocalizationDto } from './dto/localization-dto';

export class Localization {
  private readonly baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-localization-service.${host}`;
  }

  public async getStructureLocalization(
    structure_id: string,
    locale: string,
  ): Promise<LocalizationDto> {
    const url = `${this.baseUrl}/i18n/${structure_id}/${locale}`;
    return await new HttpClientProxy().get<LocalizationDto>(url);
  }
}
