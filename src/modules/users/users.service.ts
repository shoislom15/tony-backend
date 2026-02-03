import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto';
import { User, UserDocument } from '../../database/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(userData: Partial<User>): Promise<UserDocument> {
    return this.usersRepository.create(userData);
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findByTelegramId(telegramId: string): Promise<UserDocument | null> {
    return this.usersRepository.findByTelegramId(telegramId);
  }

  async getProfile(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toUserResponse(user);
  }

  async updateProfile(userId: string, updateDto: UpdateUserDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateData: Partial<User> = {};

    if (updateDto.email && updateDto.email !== user.email) {
      const existingUser = await this.usersRepository.findByEmail(updateDto.email);
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
      updateData.email = updateDto.email;
    }

    if (updateDto.telegramId && updateDto.telegramId !== user.telegramId) {
      const existingUser = await this.usersRepository.findByTelegramId(updateDto.telegramId);
      if (existingUser) {
        throw new BadRequestException('Telegram ID already in use');
      }
      updateData.telegramId = updateDto.telegramId;
    }

    if (updateDto.password) {
      updateData.password = await bcrypt.hash(updateDto.password, 10);
    }

    if (updateDto.name) {
      updateData.name = updateDto.name;
    }

    if (updateDto.settings) {
      updateData.settings = {
        ...user.settings,
        ...updateDto.settings,
      };
    }

    const updatedUser = await this.usersRepository.update(userId, updateData);

    return this.toUserResponse(updatedUser!);
  }

  async deleteAccount(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(userId);
  }

  private toUserResponse(user: UserDocument) {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      telegramId: user.telegramId,
      settings: user.settings,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
