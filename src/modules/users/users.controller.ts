import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Get the current user profile with settings',
  })
  @ApiResponse({ status: 200, description: 'User profile data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Update user profile information and settings',
  })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(userId, updateDto);
  }

  @Delete('account')
  @ApiOperation({
    summary: 'Delete user account',
    description: 'Permanently delete the user account and all associated data',
  })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteAccount(@CurrentUser('id') userId: string) {
    await this.usersService.deleteAccount(userId);
    return { message: 'Account deleted successfully' };
  }
}
