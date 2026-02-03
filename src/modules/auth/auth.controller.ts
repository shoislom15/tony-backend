import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, TelegramAuthDto, AuthResponseDto } from './dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Create a new user account with email and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate with email and password',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('telegram')
  @ApiOperation({
    summary: 'Telegram authentication',
    description: 'Authenticate or register via Telegram ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    type: AuthResponseDto,
  })
  async telegramAuth(@Body() telegramAuthDto: TelegramAuthDto) {
    return this.authService.telegramAuth(telegramAuthDto);
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get current user',
    description: 'Get the currently authenticated user profile',
  })
  @ApiResponse({ status: 200, description: 'Current user data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async me(@CurrentUser() user: any) {
    return user;
  }
}
