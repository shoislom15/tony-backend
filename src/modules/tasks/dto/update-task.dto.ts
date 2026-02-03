import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../../../database/schemas/task.schema';

export class UpdateSubtaskDto {
  @ApiPropertyOptional({
    description: 'Subtask title',
    example: 'Review PR comments',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Whether subtask is completed',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateRecurringPatternDto {
  @ApiPropertyOptional({
    description: 'Recurrence frequency',
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    example: 'weekly',
  })
  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  @IsOptional()
  frequency?: string;

  @ApiPropertyOptional({
    description: 'Interval between recurrences',
    example: 2,
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

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Task title',
    example: 'Updated task title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Updated task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Task status',
    enum: TaskStatus,
    example: 'in_progress',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Task priority level',
    enum: TaskPriority,
    example: 'high',
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Due date in ISO 8601 format',
    example: '2024-06-30',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'Tags for categorization',
    type: [String],
    example: ['work', 'priority'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'List of subtasks',
    type: [UpdateSubtaskDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubtaskDto)
  @IsOptional()
  subtasks?: UpdateSubtaskDto[];

  @ApiPropertyOptional({
    description: 'Whether the task is recurring',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @ApiPropertyOptional({
    description: 'Recurring pattern configuration',
    type: UpdateRecurringPatternDto,
  })
  @ValidateNested()
  @Type(() => UpdateRecurringPatternDto)
  @IsOptional()
  recurringPattern?: UpdateRecurringPatternDto;
}
