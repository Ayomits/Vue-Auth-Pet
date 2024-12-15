import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MeasuresOfLength } from 'src/utils/other/constants';

export class UserDto {
  @IsString()
  @MaxLength(MeasuresOfLength.MIDDLE)
  username: string;

  @MaxLength(MeasuresOfLength.LARGE)
  @IsString()
  @Optional()
  @IsNotEmpty()
  email?: string;

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
