import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/abstractions/abstract.service';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DoesNotExistsException } from 'src/common/exceptions/doesNotExists.exception';
import * as bcrypt from 'bcrypt';
import { PasswordNotMatch } from 'src/common/exceptions/passwordNotMatch';

export enum TokenType {
  ACCESS = 'ACCESS_SECRET_KEY',
  REFRESH = 'REFRESH_SECRET_KEY',
}

@Injectable()
export class AuthService extends AbstractService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async signToken(newUser: any) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(newUser, {
        secret: this.configService.get(TokenType.ACCESS),
      }),
      this.jwtService.sign(newUser, {
        secret: this.configService.get(TokenType.REFRESH),
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async verifyToken(token: string, type: TokenType) {
    return await this.jwtService.verify(token, {
      secret: this.configService.get(type),
    });
  }

  // Creating new user
  async register(dto: UserDto) {
    const newUser = await this.userService.create({ ...dto });
    return {
      ...(await this.signToken(newUser)),
    };
  }

  // Log:pass
  async login(dto: AuthDto) {
    const existed =
      // (await this.userService.findByEmail(dto.email)) ||
      (await this.userService.findByUsername(dto.username));
    if (!existed) throw new DoesNotExistsException();
    if (!(await bcrypt.compare(dto.password, existed.password)))
      throw new PasswordNotMatch();
    return {
      ...(await this.signToken(existed)),
    };
  }
}
