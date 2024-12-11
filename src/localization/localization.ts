import { HttpClientProxy } from '../utils/http-client-proxy';
import { ServiceType } from '../utils/service.types';
import { LocalizationDto } from './dto/localization-dto';

export class Localization {
  private readonly baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-localization-service${host}`;
  }

  public async getStructureLocalization(
    structureId: string,
    locale: string,
  ): Promise<LocalizationDto> {
    const url = `${this.baseUrl}/localizations/${ServiceType.STRUCTURE}/${structureId}/${locale}`;
    return await new HttpClientProxy().get<LocalizationDto>(url);
  }
}
