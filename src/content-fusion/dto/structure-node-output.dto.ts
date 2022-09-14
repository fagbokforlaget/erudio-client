export type Localization = Record<string, unknown>;

export type Content = Record<string, unknown>;

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

export class StructureNodeOutputDto {
  readonly namespace: string;
  readonly schemaId: string;
  readonly content: Content;
  readonly type: TypeEnum;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: string;
  localization: Record<string, Localization>;
  readonly tags: Tag[];
}
