export interface LearningPathDto {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly metadata?: Metadata;
  readonly forkId?: string;
  readonly status: string;
  readonly namespaceId?: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

interface Metadata {
  readonly description?: string;
  readonly descriptionInstructor?: string;
  readonly author?: string;
  readonly coverId?: string;
  readonly coverAlt?: string;
  readonly coverCopyright?: string;
  readonly bannerId?: string;
  readonly bannerAlt?: string;
  readonly bannerCopyright?: string;
  readonly duration?: number;
}
