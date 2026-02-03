import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../../database/schemas/task.schema';

export interface TaskFilter {
  userId: Types.ObjectId;
  status?: string;
  priority?: string;
  tag?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  search?: string;
}

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(taskData: Partial<Task>): Promise<TaskDocument> {
    const task = new this.taskModel(taskData);
    return task.save();
  }

  async findById(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findById(id).exec();
  }

  async findByIdAndUser(
    id: string,
    userId: string,
  ): Promise<TaskDocument | null> {
    return this.taskModel
      .findOne({ _id: id, userId: new Types.ObjectId(userId) })
      .exec();
  }

  async findMany(
    filter: TaskFilter,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ tasks: TaskDocument[]; total: number }> {
    const query: Record<string, any> = { userId: filter.userId };

    if (filter.status) {
      query.status = filter.status;
    }

    if (filter.priority) {
      query.priority = filter.priority;
    }

    if (filter.tag) {
      query.tags = filter.tag;
    }

    if (filter.dueDateFrom || filter.dueDateTo) {
      query.dueDate = {};
      if (filter.dueDateFrom) {
        query.dueDate.$gte = filter.dueDateFrom;
      }
      if (filter.dueDateTo) {
        query.dueDate.$lte = filter.dueDateTo;
      }
    }

    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { description: { $regex: filter.search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      this.taskModel
        .find(query)
        .sort({ dueDate: 1, priority: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.taskModel.countDocuments(query).exec(),
    ]);

    return { tasks, total };
  }

  async update(
    id: string,
    updateData: Partial<Task>,
  ): Promise<TaskDocument | null> {
    return this.taskModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
