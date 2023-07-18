import { TagObject } from '../../tag/dto/tag.dto';

export interface LearningPathDto {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly metadata?: Metadata;
  readonly forkId?: string;
  readonly status: string;
  readonly namespaceId?: string;
  readonly learningPathElements: LearningPathElementOutputDto[];
  readonly tags: TagObject[];
  localizations: {
    readonly locale: string;
    readonly content: Record<string, unknown>;
  }[];
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

interface Metadata {
  readonly description?: string;
  readonly descriptionInstructor?: string;
  readonly author?: string;
  readonly coverId?: string;
  readonly coverAlt?: string;
  readonly coverCopyright?: string;
  readonly bannerId?: string;
  readonly bannerAlt?: string;
  readonly bannerCopyright?: string;
  readonly duration?: number;
}

class LearningPathElementOutputDto {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly namespaceId: string;
  readonly description?: string;
  readonly contentId?: string;
  readonly contentType?: string;
  readonly condition?: Record<string, unknown>;
}

export type LearningPathWithLocalizationDto = Omit<
  LearningPathDto,
  'localizations'
> & {
  readonly localization?: Record<string, unknown>;
};
