import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { TasksRepository } from './tasks.repository';
import {
  CreateTaskDto,
  UpdateTaskDto,
  FilterTasksDto,
  UpdateStatusDto,
} from './dto';
import { TaskDocument } from '../../database/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(userId: string, createDto: CreateTaskDto) {
    const taskData: any = {
      ...createDto,
      userId: new Types.ObjectId(userId),
      dueDate: createDto.dueDate ? new Date(createDto.dueDate) : undefined,
      subtasks: createDto.subtasks?.map((s) => ({
        title: s.title,
        completed: s.completed ?? false,
      })),
    };

    const task = await this.tasksRepository.create(taskData);
    return this.toTaskResponse(task);
  }

  async findAll(userId: string, filterDto: FilterTasksDto) {
    const filter = {
      userId: new Types.ObjectId(userId),
      status: filterDto.status,
      priority: filterDto.priority,
      tag: filterDto.tag,
      dueDateFrom: filterDto.dueDateFrom
        ? new Date(filterDto.dueDateFrom)
        : undefined,
      dueDateTo: filterDto.dueDateTo
        ? new Date(filterDto.dueDateTo)
        : undefined,
      search: filterDto.search,
    };

    const page = filterDto.page || 1;
    const limit = filterDto.limit || 20;

    const { tasks, total } = await this.tasksRepository.findMany(
      filter,
      page,
      limit,
    );

    return {
      tasks: tasks.map((task) => this.toTaskResponse(task)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, taskId: string) {
    const task = await this.tasksRepository.findByIdAndUser(taskId, userId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.toTaskResponse(task);
  }

  async update(userId: string, taskId: string, updateDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findByIdAndUser(taskId, userId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updateData: any = {
      ...updateDto,
      dueDate: updateDto.dueDate ? new Date(updateDto.dueDate) : undefined,
    };

    if (updateDto.subtasks) {
      updateData.subtasks = updateDto.subtasks.map((s) => ({
        title: s.title ?? '',
        completed: s.completed ?? false,
      }));
    }

    const updatedTask = await this.tasksRepository.update(taskId, updateData);
    return this.toTaskResponse(updatedTask!);
  }

  async updateStatus(
    userId: string,
    taskId: string,
    updateStatusDto: UpdateStatusDto,
  ) {
    const task = await this.tasksRepository.findByIdAndUser(taskId, userId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = await this.tasksRepository.update(taskId, {
      status: updateStatusDto.status,
    });

    return this.toTaskResponse(updatedTask!);
  }

  async delete(userId: string, taskId: string) {
    const task = await this.tasksRepository.findByIdAndUser(taskId, userId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.delete(taskId);
  }

  private toTaskResponse(task: TaskDocument) {
    return {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      tags: task.tags,
      subtasks: task.subtasks,
      isRecurring: task.isRecurring,
      recurringPattern: task.recurringPattern,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
