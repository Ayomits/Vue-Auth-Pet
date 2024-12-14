import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordNotMatch extends HttpException {
  constructor() {
    super(
      {
        message: 'Password does not match',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
