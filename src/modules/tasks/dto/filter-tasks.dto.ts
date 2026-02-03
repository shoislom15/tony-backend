import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskStatus, TaskPriority } from '../../../database/schemas/task.schema';

export class FilterTasksDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsDateString()
  @IsOptional()
  dueDateFrom?: string;

  @IsDateString()
  @IsOptional()
  dueDateTo?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  limit?: number = 20;
}
