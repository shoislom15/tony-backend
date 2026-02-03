import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Note, NoteDocument } from '../../database/schemas/note.schema';

export interface NoteFilter {
  userId: Types.ObjectId;
  search?: string;
  folder?: string;
  tag?: string;
  isPinned?: boolean;
}

@Injectable()
export class NotesRepository {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(noteData: Partial<Note>): Promise<NoteDocument> {
    const note = new this.noteModel(noteData);
    return note.save();
  }

  async findById(id: string): Promise<NoteDocument | null> {
    return this.noteModel.findById(id).exec();
  }

  async findByIdAndUser(
    id: string,
    userId: string,
  ): Promise<NoteDocument | null> {
    return this.noteModel
      .findOne({ _id: id, userId: new Types.ObjectId(userId) })
      .exec();
  }

  async findMany(
    filter: NoteFilter,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ notes: NoteDocument[]; total: number }> {
    const query: Record<string, any> = { userId: filter.userId };

    if (filter.folder) {
      query.folder = filter.folder;
    }

    if (filter.tag) {
      query.tags = filter.tag;
    }

    if (filter.isPinned !== undefined) {
      query.isPinned = filter.isPinned;
    }

    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { content: { $regex: filter.search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
      this.noteModel
        .find(query)
        .sort({ isPinned: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.noteModel.countDocuments(query).exec(),
    ]);

    return { notes, total };
  }

  async update(
    id: string,
    updateData: Partial<Note>,
  ): Promise<NoteDocument | null> {
    return this.noteModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<NoteDocument | null> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
