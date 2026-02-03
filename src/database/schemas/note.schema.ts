import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ trim: true, index: true })
  folder?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: false })
  isPinned: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

NoteSchema.index({ userId: 1, folder: 1 });
NoteSchema.index({ userId: 1, isPinned: -1, updatedAt: -1 });
NoteSchema.index({ title: 'text', content: 'text' });
