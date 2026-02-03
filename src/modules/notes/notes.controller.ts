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
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto, SearchNotesDto } from './dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createDto: CreateNoteDto,
  ) {
    return this.notesService.create(userId, createDto);
  }

  @Get()
  async findAll(
    @CurrentUser('id') userId: string,
    @Query() searchDto: SearchNotesDto,
  ) {
    return this.notesService.findAll(userId, searchDto);
  }

  @Get(':id')
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
  ) {
    return this.notesService.findOne(userId, noteId);
  }

  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
    @Body() updateDto: UpdateNoteDto,
  ) {
    return this.notesService.update(userId, noteId, updateDto);
  }

  @Delete(':id')
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
  ) {
    await this.notesService.delete(userId, noteId);
    return { message: 'Note deleted successfully' };
  }
}
