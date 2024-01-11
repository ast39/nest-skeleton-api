import { Injectable } from '@nestjs/common';
import { IPrismaTR, PrismaService } from '../../prisma';
import { UserDto } from './dto/user.dto';
import {
  IUserFilter,
  IUserOrder,
  IUserUnique,
  IUserUpdate,
} from '../../common/interfaces/user.interface';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  // Список пользователей
  async index(
    params: {
      skip?: number;
      take?: number;
      cursor?: IUserUnique;
      where?: IUserFilter;
      orderBy?: IUserOrder;
    },
    tx?: IPrismaTR,
  ): Promise<UserDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const prisma = tx ?? this.prisma;

    const users = await prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return users.map((user) => {
      return { ...user, userRoles: user.userRoles.map((role) => role.role) };
    });
  }

  // Пользователь по ID
  async show(cursor: IUserUnique, tx?: IPrismaTR): Promise<UserDto | null> {
    const prisma = tx ?? this.prisma;

    const user = await prisma.user.findUnique({
      where: cursor,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return { ...user, userRoles: user.userRoles.map((role) => role.role) };
  }

  // Добавление пользователя
  async store(data: UserCreateDto, tx?: IPrismaTR): Promise<UserDto> {
    const prisma = tx ?? this.prisma;

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        status: data.status,
      },
    });

    const roles = [];
    for (const role of data.roles) {
      roles.push(
        await prisma.userRoles.create({
          data: {
            userId: user.userId,
            roleId: role,
          },
        }),
      );
    }

    return { ...user, userRoles: roles };
  }

  // Обновление пользователя
  async update(
    params: {
      where: IUserUnique;
      data: IUserUpdate;
    },
    tx?: IPrismaTR,
  ): Promise<UserDto> {
    const { where, data } = params;
    const prisma = tx ?? this.prisma;

    const user = await prisma.user.update({
      data,
      where,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return { ...user, userRoles: user.userRoles.map((role) => role.role) };
  }

  // Удаление пользователя
  async destroy(where: IUserUnique, tx?: IPrismaTR): Promise<UserDto> {
    const prisma = tx ?? this.prisma;

    const user = await prisma.user.delete({
      where,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return { ...user, userRoles: user.userRoles.map((role) => role.role) };
  }
}
