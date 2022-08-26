import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class FindByNamespaceInputDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly namespace: string;
}
