export class FindByNamespaceOutputDto {
  readonly data: [];
  readonly pagination: {
    total: number;
    page: number;
    limit: number;
    next?: number;
  };
}
