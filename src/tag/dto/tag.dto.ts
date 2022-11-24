export interface TagSource {
  readonly source: string;
  readonly keyword: string;
}

export interface TagObject {
  readonly id: string;
  readonly service: string;
  readonly object_id: string;
  readonly tags: TagSource[];
  readonly created_at: string;
  readonly updated_at: string;
}
