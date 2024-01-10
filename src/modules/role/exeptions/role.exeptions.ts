import { HttpException, HttpStatus } from '@nestjs/common';

export class RoleNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status: 'error',
        message: 'Роль не найдена',
        type: 'notification',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class RoleTitleExistException extends HttpException {
  constructor() {
    super(
      {
        status: 'error',
        email: 'Роль с таким названием уже существует',
        type: 'notification',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
