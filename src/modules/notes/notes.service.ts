import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto, UpdateNoteDto, SearchNotesDto } from './dto';
import { NoteDocument } from '../../database/schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(private notesRepository: NotesRepository) {}

  async create(userId: string, createDto: CreateNoteDto) {
    const noteData = {
      ...createDto,
      userId: new Types.ObjectId(userId),
    };

    const note = await this.notesRepository.create(noteData);
    return this.toNoteResponse(note);
  }

  async findAll(userId: string, searchDto: SearchNotesDto) {
    const filter = {
      userId: new Types.ObjectId(userId),
      search: searchDto.search,
      folder: searchDto.folder,
      tag: searchDto.tag,
      isPinned: searchDto.isPinned,
    };

    const page = searchDto.page || 1;
    const limit = searchDto.limit || 20;

    const { notes, total } = await this.notesRepository.findMany(
      filter,
      page,
      limit,
    );

    return {
      notes: notes.map((note) => this.toNoteResponse(note)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, noteId: string) {
    const note = await this.notesRepository.findByIdAndUser(noteId, userId);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return this.toNoteResponse(note);
  }

  async update(userId: string, noteId: string, updateDto: UpdateNoteDto) {
    const note = await this.notesRepository.findByIdAndUser(noteId, userId);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const updatedNote = await this.notesRepository.update(noteId, updateDto);
    return this.toNoteResponse(updatedNote!);
  }

  async delete(userId: string, noteId: string) {
    const note = await this.notesRepository.findByIdAndUser(noteId, userId);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.notesRepository.delete(noteId);
  }

  private toNoteResponse(note: NoteDocument) {
    return {
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      folder: note.folder,
      tags: note.tags,
      isPinned: note.isPinned,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}
