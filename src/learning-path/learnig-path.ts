import { HttpClientProxy } from '../utils/http-client-proxy';
import { LearningPathDto } from './dto/learning-path.dto';

export class LearningPath {
  private readonly baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-learning-path-runner-service.${host}`;
  }

  public async getlearningPath(id: string): Promise<LearningPathDto> {
    const url = `${this.baseUrl}/learning-paths/${id}`;
    return await new HttpClientProxy().get<LearningPathDto>(url);
  }
}
