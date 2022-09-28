import { ContentNode } from '../../content-fusion/dto/content-node-dto';

export class PaginatedNodes<T> {
  readonly data: T[];
  readonly pagination: {
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly next?: number;
  };
}

export interface StructureChildren extends Node {
  readonly contents: ContentNode;
}

export interface Structure extends Node {
  readonly children: StructureChildren[];
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
}

export interface Options {
  readonly filter?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: string;
}
