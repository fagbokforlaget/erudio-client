export class PaginatedNodes<T> {
  readonly data: T[];
  readonly pagination: {
    total: number;
    page: number;
    limit: number;
    next?: number;
  };
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
