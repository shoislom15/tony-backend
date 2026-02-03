import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto, TelegramAuthDto, AuthResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    if (registerDto.telegramId) {
      const existingTelegram = await this.usersService.findByTelegramId(
        registerDto.telegramId,
      );
      if (existingTelegram) {
        throw new BadRequestException('Telegram ID already registered');
      }
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.generateAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthResponse(user);
  }

  async telegramAuth(telegramAuthDto: TelegramAuthDto): Promise<AuthResponseDto> {
    let user = await this.usersService.findByTelegramId(
      telegramAuthDto.telegramId,
    );

    if (!user) {
      throw new UnauthorizedException(
        'Telegram account not linked. Please register first.',
      );
    }

    return this.generateAuthResponse(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  private generateAuthResponse(user: any): AuthResponseDto {
    const payload = { sub: user._id.toString(), email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        telegramId: user.telegramId,
      },
    };
  }
}
