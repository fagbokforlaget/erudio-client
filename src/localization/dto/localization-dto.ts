export interface LocalizationDto {
  readonly object_id: string;
  readonly validation_schema_url?: string;
  readonly service: string;
  readonly locale: string;
  readonly content: Record<string, unknown>;
  readonly created_at: string;
  readonly updated_at: string;
}
