import { IsEmail, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  emailNotifications?: boolean;

  @IsOptional()
  telegramNotifications?: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  telegramId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSettingsDto)
  settings?: UpdateSettingsDto;
}
