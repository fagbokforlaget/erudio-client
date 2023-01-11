export interface LocalizationDto {
  readonly locale: string;
  readonly objectId: string;
  readonly service: string;
  readonly content: Record<string, unknown>;
  readonly created_at: string;
  readonly updated_at: string;
  readonly id: string;
}
