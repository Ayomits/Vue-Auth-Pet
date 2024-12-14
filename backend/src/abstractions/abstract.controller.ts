import { HttpStatus } from '@nestjs/common';
import { Abstract } from './abstract';

export interface IBaseResponse {
  code: number | HttpStatus;
}

export interface ISuccessResponseOptions extends IBaseResponse {
  data: unknown;
}

export interface IErrorResponse extends IBaseResponse {
  message: string;
}

export class AbstractController extends Abstract {}
