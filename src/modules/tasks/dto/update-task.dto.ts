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
import { TaskStatus, TaskPriority } from '../../../database/schemas/task.schema';

export class UpdateSubtaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateRecurringPatternDto {
  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  @IsOptional()
  frequency?: string;

  @IsNumber()
  @IsOptional()
  interval?: number;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubtaskDto)
  @IsOptional()
  subtasks?: UpdateSubtaskDto[];

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @ValidateNested()
  @Type(() => UpdateRecurringPatternDto)
  @IsOptional()
  recurringPattern?: UpdateRecurringPatternDto;
}
