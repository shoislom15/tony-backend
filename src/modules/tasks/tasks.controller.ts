import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  FilterTasksDto,
  UpdateStatusDto,
} from './dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createDto: CreateTaskDto,
  ) {
    return this.tasksService.create(userId, createDto);
  }

  @Get()
  async findAll(
    @CurrentUser('id') userId: string,
    @Query() filterDto: FilterTasksDto,
  ) {
    return this.tasksService.findAll(userId, filterDto);
  }

  @Get(':id')
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
  ) {
    return this.tasksService.findOne(userId, taskId);
  }

  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
    @Body() updateDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(userId, taskId, updateDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.tasksService.updateStatus(userId, taskId, updateStatusDto);
  }

  @Delete(':id')
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
  ) {
    await this.tasksService.delete(userId, taskId);
    return { message: 'Task deleted successfully' };
  }
}
