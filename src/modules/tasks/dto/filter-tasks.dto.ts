import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../../../database/schemas/task.schema';

export class FilterTasksDto {
  @ApiPropertyOptional({
    description: 'Filter by task status',
    enum: TaskStatus,
    example: 'pending',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Filter by task priority',
    enum: TaskPriority,
    example: 'high',
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Filter by tag',
    example: 'work',
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({
    description: 'Filter tasks due on or after this date',
    example: '2024-01-01',
  })
  @IsDateString()
  @IsOptional()
  dueDateFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter tasks due on or before this date',
    example: '2024-12-31',
  })
  @IsDateString()
  @IsOptional()
  dueDateTo?: string;

  @ApiPropertyOptional({
    description: 'Search in title and description',
    example: 'documentation',
  })
  @IsString()
  @IsOptional()
  search?: string;

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
