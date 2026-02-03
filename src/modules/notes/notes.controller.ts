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
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto, SearchNotesDto } from './dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('notes')
@ApiBearerAuth('JWT-auth')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create note',
    description: 'Create a new note with optional folder and tags',
  })
  @ApiResponse({ status: 201, description: 'Note created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() createDto: CreateNoteDto,
  ) {
    return this.notesService.create(userId, createDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List notes',
    description: 'Get all notes with optional search, folder filter, and pagination',
  })
  @ApiResponse({ status: 200, description: 'List of notes' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @CurrentUser('id') userId: string,
    @Query() searchDto: SearchNotesDto,
  ) {
    return this.notesService.findAll(userId, searchDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get note by ID',
    description: 'Get a single note by its ID',
  })
  @ApiParam({ name: 'id', description: 'Note ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Note details' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
  ) {
    return this.notesService.findOne(userId, noteId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update note',
    description: 'Update note properties',
  })
  @ApiParam({ name: 'id', description: 'Note ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Note updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
    @Body() updateDto: UpdateNoteDto,
  ) {
    return this.notesService.update(userId, noteId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete note',
    description: 'Permanently delete a note',
  })
  @ApiParam({ name: 'id', description: 'Note ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Note deleted successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
  ) {
    await this.notesService.delete(userId, noteId);
    return { message: 'Note deleted successfully' };
  }
}
