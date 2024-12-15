import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractService } from 'src/abstractions/abstract.service';
import { ResetPasswordDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AlreadyExistsException } from 'src/common/exceptions/alreadyExists.exception';
import { DoesNotExistsException } from 'src/common/exceptions/doesNotExists.exception';
import { PasswordNotMatch } from 'src/common/exceptions/passwordNotMatch';

export enum FindUserType {
  UserId = 'id',
  Email = 'email',
  Username = 'username',
}

@Injectable()
export class UserService extends AbstractService {
  async findById(id: string) {
    return await this.db.users.findFirst({
      where: {
        id: id,
      },
      include: {
        Profile: {
          where: {
            user_id: id,
          },
        },
      },
    });
  }

  async findByUsername(username: string) {
    return await this.db.users.findFirst({
      where: {
        username: username,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.db.users.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findOne(entity: string, type: string) {
    let user;
    switch (type) {
      case FindUserType.Email:
        user = await this.findByEmail(entity);
        break;
      case FindUserType.UserId:
        user = await this.findById(entity);
        break;
      case FindUserType.Username:
        user = await this.findByUsername(entity);
        break;
      default:
        user = await this.findById(entity);
        break;
    }
    if (!user) throw new DoesNotExistsException('user');
    return user;
  }

  async create(dto: UserDto) {
    const [userByEmail, userByName] = await Promise.all([
      this.findByEmail(dto.email),
      this.findByUsername(dto.username),
    ]);
    if (userByEmail) {
      throw new AlreadyExistsException('user');
    }
    if (userByName) {
      throw new AlreadyExistsException('user');
    }
    const new_user = await this.db.users.create({
      data: {
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
        Profile: {
          create: {
            global_name: dto.username,
            avatar_url: null,
          },
        },
      },
    });
    return new_user;
  }

  async resetPassword(id: string, dto: ResetPasswordDto) {
    const existed = await this.findById(id);
    if (!existed) throw new DoesNotExistsException('user');
    if (!(await bcrypt.compare(dto.old_password, existed.password)))
      throw new PasswordNotMatch();
    return await this.db.users.update({
      where: {
        id: id,
      },
      data: {
        password: await bcrypt.hash(dto.new_password, 10),
      },
    });
  }

  async delete(id: string) {
    const userExists = await this.db.users.findUnique({ where: { id } });
    if (!userExists) {
      throw new DoesNotExistsException('user');
    }
    return await this.db.users.delete({ where: { id } });
  }
}
