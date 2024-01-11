import { ApiProperty } from '@nestjs/swagger';
import { EUserStatus } from '@prisma/client';

// Объект добавления пользователя
export class UserCreateDto {
  @ApiProperty({
    title: 'E-mail',
    description: 'E-mail пользователя',
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    title: 'Пароль',
    description: 'Пароль пользователя',
    type: String,
    required: false,
    default: String,
  })
  password?: string;

  @ApiProperty({
    title: 'Имя',
    description: 'Имя пользователя',
    type: String,
    required: true,
  })
  firstName: string;

  @ApiProperty({
    title: 'Фамилия',
    description: 'Фамилия пользователя',
    type: String,
    required: true,
  })
  lastName: string;

  @ApiProperty({
    title: 'Статус',
    description: 'Статус пользователя',
    enum: EUserStatus,
    required: false,
    default: EUserStatus.ACTIVE,
  })
  status?: EUserStatus;

  @ApiProperty({
    title: 'Роли',
    description: 'Роли пользователя',
    type: Array<number>,
    required: true,
    isArray: true,
    default: null,
  })
  roles: number[];
}
