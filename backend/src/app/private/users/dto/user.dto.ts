import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { MeasuresOfLength } from 'src/utils/other/constants';

export class UserDto {
  @IsString()
  @MaxLength(MeasuresOfLength.MIDDLE)
  username: string;

  // @IsOptional()
  // @IsNotEmpty()
  // @IsEmail()
  // email?: string;

  @IsString()
  password: string;
}

export class ResetPasswordDto {
  old_password: string;
  new_password: string;
}

export class User extends UserDto {
  id: string;
}
