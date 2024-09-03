import { IsString } from 'class-validator';

export class BaseSubscriptionDto {
  @IsString()
  pageId: string;

  @IsString()
  action: string;

  @IsString()
  subscriptionId: string;
}
