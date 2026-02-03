import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../../database/schemas/task.schema';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'New task status',
    enum: TaskStatus,
    example: 'completed',
  })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
