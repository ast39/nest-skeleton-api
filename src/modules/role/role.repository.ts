import { Injectable } from '@nestjs/common';
import { IPrismaTR, PrismaService } from '../../prisma';
import { RoleDto } from './dto/role.dto';
import {
  IRoleCreate,
  IRoleFilter,
  IRoleOrder,
  IRoleUnique,
  IRoleUpdate,
} from '../../common/interfaces/role.interface';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  // Список ролей
  async index(
    params: {
      skip?: number;
      take?: number;
      cursor?: IRoleUnique;
      where?: IRoleFilter;
      orderBy?: IRoleOrder;
    },
    tx?: IPrismaTR,
  ): Promise<RoleDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const prisma = tx ?? this.prisma;

    return prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Роль по ID
  async show(cursor: IRoleUnique, tx?: IPrismaTR): Promise<RoleDto | null> {
    const prisma = tx ?? this.prisma;

    return prisma.role.findUnique({
      where: cursor,
    });
  }

  // Добавление роли
  async store(data: IRoleCreate, tx?: IPrismaTR): Promise<RoleDto> {
    const prisma = tx ?? this.prisma;

    return prisma.role.create({
      data,
    });
  }

  // Обновление роли
  async update(
    params: {
      where: IRoleUnique;
      data: IRoleUpdate;
    },
    tx?: IPrismaTR,
  ): Promise<RoleDto> {
    const { where, data } = params;
    const prisma = tx ?? this.prisma;

    return prisma.role.update({
      data,
      where,
    });
  }

  // Удаление роли
  async destroy(where: IRoleUnique, tx?: IPrismaTR): Promise<RoleDto> {
    const prisma = tx ?? this.prisma;

    return prisma.role.delete({
      where,
    });
  }
}
