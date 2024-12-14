import { HttpException, HttpStatus } from '@nestjs/common';

export class DoesNotExistsException extends HttpException {
  constructor() {
    super(
      {
        message: 'This entity does not exists',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
