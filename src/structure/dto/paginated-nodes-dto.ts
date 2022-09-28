export class PaginatedNodes<T> {
  readonly data: T[];
  readonly pagination: {
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly next?: number;
  };
}

export interface Options {
  readonly filter?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: string;
}
