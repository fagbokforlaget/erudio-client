import { HttpClientProxy } from '../utils/http-client-proxy';
import {
  LearningPathDto,
  LearningPathWithLocalizationDto,
} from './dto/learning-path.dto';

export class LearningPath {
  private readonly baseUrl: string;

  constructor(host: string) {
    this.baseUrl = `http://edtech-learning-path-runner-service.${host}`;
  }

  public async getlearningPath(
    id: string,
    locale: string,
  ): Promise<LearningPathWithLocalizationDto> {
    let localization: Record<string, unknown>;

    const url = `${this.baseUrl}/learning-paths/${id}`;
    const learningPath = await new HttpClientProxy().get<LearningPathDto>(url);
    if (locale && learningPath?.localizations) {
      localization = learningPath.localizations.find(
        (l) => l.locale === locale,
      ).content;
      learningPath.localizations = undefined;
    }
    return { ...learningPath, localization };
  }
}
