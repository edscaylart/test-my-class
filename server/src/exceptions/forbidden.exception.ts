import { HttpStatus, HttpException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(error: string) {
    super({
      status: HttpStatus.FORBIDDEN,
      error,
    }, HttpStatus.FORBIDDEN);
  }
}