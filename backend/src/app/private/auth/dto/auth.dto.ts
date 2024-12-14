import { Optional } from '@nestjs/common';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { MeasuresOfLength } from 'src/utils/other/Constants';

export class AuthDto {
  @IsString()
  @MaxLength(MeasuresOfLength.MIDDLE)
  username?: string;

  // @IsString()
  // @IsEmail()
  // @Optional()
  // @MaxLength(MeasuresOfLength.LARGE)
  // email?: string;

  password: string;
}
