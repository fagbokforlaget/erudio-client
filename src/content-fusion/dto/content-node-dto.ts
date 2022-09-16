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

export class ContentNode {
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
