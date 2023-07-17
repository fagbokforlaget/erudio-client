export interface LearningPathDto {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly metadata?: Record<string, unknown>;
  readonly fork_id?: string;
  readonly status: string;
  readonly created_namespace_id?: string;
  readonly created_by: string;
  readonly created_at: string;
  readonly updated_at: string;
}
