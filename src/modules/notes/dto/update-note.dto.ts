import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiPropertyOptional({
    description: 'Note title',
    example: 'Updated Meeting Notes',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Note content (supports markdown)',
    example: '# Updated Content\n\n- New item',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'Folder for organization',
    example: 'Work/Archive',
  })
  @IsString()
  @IsOptional()
  folder?: string;

  @ApiPropertyOptional({
    description: 'Tags for categorization',
    type: [String],
    example: ['archived', 'completed'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Pin note to top',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;
}
