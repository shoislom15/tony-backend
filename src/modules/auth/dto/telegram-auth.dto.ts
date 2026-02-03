import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TelegramAuthDto {
  @IsString()
  @IsNotEmpty()
  telegramId: string;

  @IsString()
  @IsOptional()
  name?: string;
}
