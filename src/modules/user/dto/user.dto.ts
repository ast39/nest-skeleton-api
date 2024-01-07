import { EUserRole, EUserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    title: 'ID',
    description: 'ID пользователя',
    type: Number,
  })
  userId: number;

  @ApiProperty({
    title: 'E-mail',
    description: 'E-mail пользователя',
    type: String,
  })
  email: string;

  @ApiProperty({
    title: 'Пароль',
    description: 'Пароль пользователя',
    type: String,
    required: false,
  })
  password?: string;

  @ApiProperty({
    title: 'Токен Remember Me',
    description: 'Токен Remember Me',
    type: String,
  })
  refreshToken: string;

  @ApiProperty({
    title: 'Имя',
    description: 'Имя пользователя',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    title: 'Фамилия',
    description: 'Фамилия пользователя',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    title: 'Права',
    description: 'Права пользователя',
    enum: EUserRole,
  })
  role: EUserRole;

  @ApiProperty({
    title: 'Статус',
    description: 'Статус пользователя',
    enum: EUserStatus,
  })
  status: EUserStatus;
}
