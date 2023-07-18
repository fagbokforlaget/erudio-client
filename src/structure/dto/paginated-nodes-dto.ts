import { Contents } from '../../content-fusion/dto/content-node-dto';
import { LearningPathWithLocalizationDto } from '../../learning-path/dto/learning-path.dto';
import { TagSource } from '../../tag/dto/tag.dto';

export class PaginatedNodes<T> {
  readonly data: T[];
  readonly pagination: {
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly next?: number;
  };
}

export interface Options {
  readonly filter?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: string;
}

export interface Node {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly namespace: string;
  readonly description?: string;
  readonly parent?: string;
  readonly cover?: string;
  readonly order: number;
  readonly type: string;
  readonly contentId?: string;
  readonly contentType?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly accessLevel: string;
  readonly contents?: Contents;
  readonly localization: Record<string, unknown>;
  readonly learningPath?: LearningPathWithLocalizationDto;
}

export interface StructureNode extends Node {
  readonly children?: Node[];
  readonly tags?: TagSource[];
}
