import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/abstractions/abstract.service';
import { ResetPasswordDto, UserDto } from './dto/user.dto';
import { AlreadyExistsException } from 'src/common/exceptions/alreadyExists.exception';
import { DoesNotExistsException } from 'src/common/exceptions/doesNotExists.exception';
import { PasswordNotMatch } from 'src/common/exceptions/passwordNotMatch';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

export enum FindUserType {
  UserId = 'id',
  Email = 'email',
  Username = 'username',
}

@Injectable()
export class UserService extends AbstractService {
  /**
   * Low level method
   */
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

  /**
   * Low level method
   */
  async findByUsername(username: string) {
    return await this.db.users.findFirst({
      where: {
        username: username,
      },
    });
  }

  /**
   * Low level method
   */
  async findByEmail(email: string) {
    return await this.db.users.findFirst({
      where: {
        email: email,
      },
    });
  }

  /**
   * High level method
   * @param entity - email/username/id of user
   * @param type - by the fact that we make a query to the database
   *
   */
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
    return this.omitUser(user);
  }

  async create(dto: UserDto) {
    const [userByName] = await Promise.all([this.findByUsername(dto.username)]);
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
    return this.omitUser(new_user);
  }

  private omitUser(user: UserDto) {
    return _.omit(user, ['password']);
  }

  async resetPassword(id: string, dto: ResetPasswordDto) {
    const existed = await this.findById(id);
    if (!existed) throw new DoesNotExistsException('user');
    if (!(await bcrypt.compare(dto.old_password, existed.password)))
      throw new PasswordNotMatch();
    const updated = await this.db.users.update({
      where: {
        id: id,
      },
      data: {
        password: await bcrypt.hash(dto.new_password, 10),
      },
    });
    return this.omitUser(updated);
  }

  async delete(id: string) {
    const userExists = await this.db.users.findUnique({ where: { id } });
    if (!userExists) {
      throw new DoesNotExistsException('user');
    }
    const deleted = await this.db.users.delete({ where: { id } });
    return this.omitUser(deleted);
  }
}
