import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor() {
    super(
      {
        message: 'This entity already exists',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
