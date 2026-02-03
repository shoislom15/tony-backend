import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch('profile')
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(userId, updateDto);
  }

  @Delete('account')
  async deleteAccount(@CurrentUser('id') userId: string) {
    await this.usersService.deleteAccount(userId);
    return { message: 'Account deleted successfully' };
  }
}
