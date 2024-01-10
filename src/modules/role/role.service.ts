import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { PrismaService } from '../../prisma';
import { RoleDto } from './dto/role.dto';
import {
  IRoleCreate,
  IRoleUpdate,
} from '../../common/interfaces/role.interface';
import {
  RoleNotFoundException,
  RoleTitleExistException,
} from './exeptions/role.exeptions';
import { RoleFilterDto } from './dto/role.filter.dto';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    private roleRepo: RoleRepository,
  ) {}

  // Список ролей
  async roleList(roleFilter: RoleFilterDto): Promise<RoleDto[]> {
    const { page = 1, limit = 10 } = roleFilter;

    return this.prisma.$transaction(async (tx) => {
      const roles = await this.roleRepo.index(
        {
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { roleName: 'asc' },
        },
        tx,
      );
      if (!roles) {
        throw new RoleNotFoundException();
      }

      return roles;
    });
  }

  // Роль по ID
  async getRole(roleId: number): Promise<RoleDto | null> {
    return this.prisma.$transaction(async (tx) => {
      const role = await this.roleRepo.show({ roleId: roleId }, tx);
      if (!role) {
        throw new RoleNotFoundException();
      }

      return role;
    });
  }

  // Роль по названию
  async getRoleByTitle(email: string): Promise<RoleDto | null> {
    return this.prisma.$transaction(async (tx) => {
      const roles = await this.roleRepo.index(
        {
          where: {
            roleName: email,
          },
        },
        tx,
      );

      return roles[0] ?? null;
    });
  }

  // Создание роли
  async createRole(data: IRoleCreate) {
    return this.prisma.$transaction(async (tx) => {
      const role = await this.getRoleByTitle(data.roleName);
      if (role) {
        throw new RoleTitleExistException();
      }

      return this.roleRepo.store(data, tx);
    });
  }

  // Обновление роли
  async updateRole(roleId: number, data: IRoleUpdate) {
    return this.prisma.$transaction(async (tx) => {
      await this.getRole(roleId);

      return this.roleRepo.update(
        {
          where: { roleId: roleId },
          data: data,
        },
        tx,
      );
    });
  }

  // Удаление роли
  async deleteRole(roleId: number) {
    return this.prisma.$transaction(async (tx) => {
      await this.getRole(roleId);

      return this.roleRepo.destroy({ roleId: roleId }, tx);
    });
  }
}
