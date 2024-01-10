import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    title: 'ID',
    description: 'ID роли',
    type: Number,
  })
  roleId: number;

  @ApiProperty({
    title: 'Название роли',
    description: 'Название роли',
    type: String,
  })
  roleName: string;

  @ApiProperty({
    title: 'Описание роли',
    description: 'Описание роли',
    type: String,
    required: false,
  })
  description?: string;
}
