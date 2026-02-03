import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../../../database/schemas/task.schema';

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
