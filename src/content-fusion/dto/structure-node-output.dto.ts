export type Localisation = {
  readonly id: string;
  readonly validation_schema_url?: string;
  readonly service: string;
  readonly object_id: string;
  readonly locale: string;
  readonly content: Record<string, unknown>;
  readonly created_at: string;
  readonly updated_at: string;
};

export type Tag = {
  readonly source: string;
  readonly keyword: string;
};

export class StructureNodeOutputDto {
  localization: Localisation | Object;
  readonly tags: Tag;
}
