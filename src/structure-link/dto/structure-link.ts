export interface StructureLink {
  readonly id: string;
  readonly sourceId: string;
  readonly sourceNamespaceId: string;
  readonly sourceSlug: string;
  readonly targetId: string;
  readonly targetNamespaceId: string;
  readonly type: string;
}
