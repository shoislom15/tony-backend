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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  FilterTasksDto,
  UpdateStatusDto,
} from './dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('tasks')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create task',
    description: 'Create a new task with optional subtasks and recurring pattern',
  })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() createDto: CreateTaskDto,
  ) {
    return this.tasksService.create(userId, createDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List tasks',
    description: 'Get all tasks with optional filtering, sorting, and pagination',
  })
  @ApiResponse({ status: 200, description: 'List of tasks' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @CurrentUser('id') userId: string,
    @Query() filterDto: FilterTasksDto,
  ) {
    return this.tasksService.findAll(userId, filterDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Get a single task by its ID',
  })
  @ApiParam({ name: 'id', description: 'Task ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Task details' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
  ) {
    return this.tasksService.findOne(userId, taskId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update task',
    description: 'Update task properties',
  })
  @ApiParam({ name: 'id', description: 'Task ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
    @Body() updateDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(userId, taskId, updateDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update task status',
    description: 'Quick status update for a task (pending, in_progress, completed)',
  })
  @ApiParam({ name: 'id', description: 'Task ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status value' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateStatus(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.tasksService.updateStatus(userId, taskId, updateStatusDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete task',
    description: 'Permanently delete a task',
  })
  @ApiParam({ name: 'id', description: 'Task ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string,
  ) {
    await this.tasksService.delete(userId, taskId);
    return { message: 'Task deleted successfully' };
  }
}
