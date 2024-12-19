import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractController } from 'src/abstractions/abstract.controller';
import { AuthDto, RevokeTokenDto } from './dto/auth.dto';
import { AuthService, TokenType } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import * as _ from 'lodash';

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

  @Post('revoke')
  async revokeToken(@Body() dto: RevokeTokenDto) {
    const isValid = await this.authService.verifyToken(
      dto.token,
      TokenType.REFRESH,
    );
    if (!isValid) {
      throw new UnauthorizedException('Token is Invalid');
    }
    const { access_token } = await this.authService.signToken(
      _.omit(isValid, ['iat', 'expiresIn', 'exp']),
    );
    return {
      access_token,
    };
  }
}
