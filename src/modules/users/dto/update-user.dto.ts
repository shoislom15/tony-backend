import { IsBoolean, IsEmail, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiPropertyOptional({
    description: 'Preferred language',
    example: 'en',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    description: 'Timezone',
    example: 'America/New_York',
  })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional({
    description: 'Enable email notifications',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @ApiPropertyOptional({
    description: 'Enable Telegram notifications',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  telegramNotifications?: boolean;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'newemail@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'New password (minimum 6 characters)',
    example: 'newPassword123',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    description: 'User display name',
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Telegram user ID',
    example: '987654321',
  })
  @IsOptional()
  @IsString()
  telegramId?: string;

  @ApiPropertyOptional({
    description: 'User settings',
    type: UpdateSettingsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSettingsDto)
  settings?: UpdateSettingsDto;
}
