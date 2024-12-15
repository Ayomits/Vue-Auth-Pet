import { HttpException, HttpStatus } from '@nestjs/common';

export class DoesNotExistsException extends HttpException {
  constructor(entity: string) {
    super(
      {
        message: `This ${entity} does not exists`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
