import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchNotesDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  folder?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  limit?: number = 20;
}
