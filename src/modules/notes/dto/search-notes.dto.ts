import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchNotesDto {
  @ApiPropertyOptional({
    description: 'Search in title and content',
    example: 'meeting',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by folder',
    example: 'Work/Meetings',
  })
  @IsString()
  @IsOptional()
  folder?: string;

  @ApiPropertyOptional({
    description: 'Filter by tag',
    example: 'important',
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({
    description: 'Filter by pinned status',
    example: true,
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
    example: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 20,
    example: 20,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  limit?: number = 20;
}
