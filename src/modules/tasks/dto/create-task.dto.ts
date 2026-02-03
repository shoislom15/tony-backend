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
import { TaskPriority } from '../../../database/schemas/task.schema';

export class SubtaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class RecurringPatternDto {
  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  frequency: string;

  @IsNumber()
  @IsOptional()
  interval?: number;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

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
  @Type(() => SubtaskDto)
  @IsOptional()
  subtasks?: SubtaskDto[];

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @ValidateNested()
  @Type(() => RecurringPatternDto)
  @IsOptional()
  recurringPattern?: RecurringPatternDto;
}
