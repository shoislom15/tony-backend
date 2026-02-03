import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema({ _id: false })
export class Subtask {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  completed: boolean;
}

@Schema({ _id: false })
export class RecurringPattern {
  @Prop({ enum: ['daily', 'weekly', 'monthly', 'yearly'] })
  frequency: string;

  @Prop()
  interval: number;

  @Prop()
  endDate?: Date;
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING, index: true })
  status: TaskStatus;

  @Prop({ enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Prop({ index: true })
  dueDate?: Date;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [Subtask], default: [] })
  subtasks: Subtask[];

  @Prop({ default: false })
  isRecurring: boolean;

  @Prop({ type: RecurringPattern })
  recurringPattern?: RecurringPattern;

  createdAt: Date;
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.index({ userId: 1, status: 1 });
TaskSchema.index({ userId: 1, dueDate: 1 });
