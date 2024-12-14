import { Body, Controller, Post } from '@nestjs/common';
import { AbstractController } from 'src/abstractions/abstract.controller';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController extends AbstractController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('login')
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: UserDto) {
    return await this.authService.register(dto);
  }
}
