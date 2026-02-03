import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority } from '../../../database/schemas/task.schema';

export class SubtaskDto {
  @ApiProperty({
    description: 'Subtask title',
    example: 'Review PR comments',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Whether subtask is completed',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class RecurringPatternDto {
  @ApiProperty({
    description: 'Recurrence frequency',
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    example: 'weekly',
  })
  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  frequency: string;

  @ApiPropertyOptional({
    description: 'Interval between recurrences',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  interval?: number;

  @ApiPropertyOptional({
    description: 'End date for recurring task',
    example: '2024-12-31',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Write comprehensive documentation for the API endpoints',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Task priority level',
    enum: TaskPriority,
    example: 'medium',
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Due date in ISO 8601 format',
    example: '2024-06-15',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'Tags for categorization',
    type: [String],
    example: ['work', 'urgent'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'List of subtasks',
    type: [SubtaskDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubtaskDto)
  @IsOptional()
  subtasks?: SubtaskDto[];

  @ApiPropertyOptional({
    description: 'Whether the task is recurring',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @ApiPropertyOptional({
    description: 'Recurring pattern configuration',
    type: RecurringPatternDto,
  })
  @ValidateNested()
  @Type(() => RecurringPatternDto)
  @IsOptional()
  recurringPattern?: RecurringPatternDto;
}
