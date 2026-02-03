import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Note title',
    example: 'Meeting Notes',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Note content (supports markdown)',
    example: '# Meeting Agenda\n\n- Item 1\n- Item 2',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'Folder for organization',
    example: 'Work/Meetings',
  })
  @IsString()
  @IsOptional()
  folder?: string;

  @ApiPropertyOptional({
    description: 'Tags for categorization',
    type: [String],
    example: ['meeting', 'project-x'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Pin note to top',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;
}
