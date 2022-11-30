export interface StructureLink {
  readonly id: string;
  readonly slug: string;
  readonly targetId: string;
  readonly targetNamespaceId: string;
  readonly sourceId: string;
  readonly sourceNamespaceId: string;
  readonly type: string;
}
