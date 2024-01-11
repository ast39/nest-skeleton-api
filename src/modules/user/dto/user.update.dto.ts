import { ApiProperty } from '@nestjs/swagger';
import { EUserStatus } from '@prisma/client';

// Объект редактирования пользователя
export class UserUpdateDto {
  @ApiProperty({
    title: 'E-mail',
    description: 'E-mail пользователя',
    type: String,
    required: false,
  })
  email?: string;

  @ApiProperty({
    title: 'Имя',
    description: 'Имя пользователя',
    type: String,
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    title: 'Фамилия',
    description: 'Фамилия пользователя',
    type: String,
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    title: 'Токен Remember Me',
    description: 'Токен Remember Me',
    type: String,
    required: false,
  })
  refreshToken?: string;

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
    required: false,
    isArray: true,
    default: null,
  })
  roles?: number[];
}
