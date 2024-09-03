import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  pageId: string;

  @IsString()
  planExternalCode: string;

  @IsString()
  superLogicaContractId: string;

  @IsBoolean()
  isTrial: boolean;

  @IsNumber()
  billingDay: number;

  @IsNumber()
  dueDay: number;

  @IsString()
  startDate: string;

  @IsOptional()
  cupom?: string;

  @IsOptional()
  installmentQuantity?: number;
}
