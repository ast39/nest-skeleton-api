import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { UserFilterDto } from './dto/user.filter.dto';
import * as bcrypt from 'bcryptjs';
import {
  UserEmailExistException,
  UserNotFoundException,
} from './exeptions/user.exeptions';
import { PrismaService } from '../../prisma';
import {
  IUserCreate,
  IUserUpdate,
} from '../../common/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userRepo: UserRepository,
  ) {}

  // Список пользователей
  async userList(userFilter: UserFilterDto): Promise<UserDto[]> {
    const { page = 1, limit = 10 } = userFilter;

    return this.prisma.$transaction(async (tx) => {
      const users = await this.userRepo.index(
        {
          skip: (page - 1) * limit,
          take: limit,
          where: {
            role: userFilter.role != null ? userFilter.role : undefined,
            status: userFilter.status != null ? userFilter.status : undefined,
          },
          orderBy: { userId: 'desc' },
        },
        tx,
      );
      if (!users) {
        throw new UserNotFoundException();
      }

      return users;
    });
  }

  // Пользователь по ID
  async getUser(userId: number): Promise<UserDto | null> {
    return this.prisma.$transaction(async (tx) => {
      const user = await this.userRepo.show({ userId: Number(userId) }, tx);
      if (!user) {
        throw new UserNotFoundException();
      }

      return user;
    });
  }

  // Пользователь по E-mail
  async getUserByEmail(email: string): Promise<UserDto | null> {
    return this.prisma.$transaction(async (tx) => {
      const users = await this.userRepo.index(
        {
          where: {
            email: email,
          },
        },
        tx,
      );

      return users[0] ?? null;
    });
  }

  // Добавление пользователя
  async createUser(data: IUserCreate): Promise<UserDto> {
    return this.prisma.$transaction(async (tx) => {
      const user = await this.getUserByEmail(data.email);
      if (user) {
        throw new UserEmailExistException();
      }

      data.password = await bcrypt.hash(data.password, 10);

      return this.userRepo.store(data, tx);
    });
  }

  // Обновление пользователя
  async updateUser(userId: number, data: IUserUpdate): Promise<UserDto> {
    return this.prisma.$transaction(async (tx) => {
      await this.getUser(userId);

      return this.userRepo.update(
        {
          where: { userId: Number(userId) },
          data: data,
        },
        tx,
      );
    });
  }

  // Удаление пользователя
  async deleteUser(userId: number): Promise<UserDto> {
    return this.prisma.$transaction(async (tx) => {
      await this.getUser(userId);

      return this.userRepo.destroy({ userId: Number(userId) }, tx);
    });
  }
}
