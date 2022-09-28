export type Localization = Record<string, unknown>;

export type Tag = {
  readonly source: string;
  readonly keyword: string;
};

export enum TypeEnum {
  COURSE = 'COURSE',
  UNIT = 'UNIT',
  LESSON = 'LESSON',
  DIRECTORY = 'DIRECTORY',
  OBJECT = 'OBJECT',
}

export class Contents {
  readonly namespace: string;
  readonly schemaId: string;
  readonly content: Record<string, unknown>;
  readonly type: TypeEnum;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: string;
  localization: Record<string, Localization>;
  readonly tags: Tag[];
}

export interface ContentNode {
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
}

export interface StructureNode extends ContentNode {
  readonly children: ContentNode[];
}
