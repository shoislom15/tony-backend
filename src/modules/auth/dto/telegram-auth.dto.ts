import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TelegramAuthDto {
  @ApiProperty({
    description: 'Telegram user ID',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  telegramId: string;

  @ApiPropertyOptional({
    description: 'User display name from Telegram',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
