import { ServiceType } from '../utils/service.types';
import { HttpClientProxy } from '../utils/http-client-proxy';
import { TagObject } from './dto/tag.dto';

export class TagService {
  private baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-tag-store-service.${host}`;
    // this.baseUrl = 'http://localhost:3000';
  }

  public async getTagObject(
    serviceType: ServiceType,
    objectId: string,
  ): Promise<TagObject> {
    const url = `${this.baseUrl}/tags/${serviceType}/${objectId}`;
    return await new HttpClientProxy().get<TagObject>(url);
  }
}
