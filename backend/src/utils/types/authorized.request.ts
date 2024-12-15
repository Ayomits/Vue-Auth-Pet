import { Request } from 'express';
import { User } from 'src/app/private/users/dto/user.dto';

export interface IAuthorizedRequest extends Request {
  user: User;
}
