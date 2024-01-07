import { Injectable } from '@nestjs/common';
import { IPrismaTR, PrismaService } from '../../prisma';
import { UserDto } from './dto/user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  // Список пользователей
  async index(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
    tx: IPrismaTR,
  ): Promise<UserDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const prisma = tx ?? this.prisma;

    return prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Пользователь по ID
  async show(
    cursor: Prisma.UserWhereUniqueInput,
    tx: IPrismaTR,
  ): Promise<UserDto | null> {
    const prisma = tx ?? this.prisma;

    return prisma.user.findUnique({
      where: cursor,
    });
  }

  // Добавление пользователя
  async store(data: Prisma.UserCreateInput, tx: IPrismaTR): Promise<UserDto> {
    const prisma = tx ?? this.prisma;

    return prisma.user.create({
      data,
    });
  }

  // Обновление пользователя
  async update(
    params: {
      where: Prisma.UserWhereUniqueInput;
      data: Prisma.UserUpdateInput;
    },
    tx: IPrismaTR,
  ): Promise<UserDto> {
    const { where, data } = params;
    const prisma = tx ?? this.prisma;

    return prisma.user.update({
      data,
      where,
    });
  }

  // Удаление пользователя
  async destroy(
    where: Prisma.UserWhereUniqueInput,
    tx: IPrismaTR,
  ): Promise<UserDto> {
    const prisma = tx ?? this.prisma;

    return prisma.user.delete({
      where,
    });
  }
}
