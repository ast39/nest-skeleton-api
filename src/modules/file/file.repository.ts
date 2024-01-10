import { Injectable } from '@nestjs/common';
import { IPrismaTR, PrismaService } from '../../prisma';
import {
  IFileCreate,
  IFileUnique,
} from '../../common/interfaces/file.interface';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FileRepository {
  constructor(private prisma: PrismaService) {}

  // Файл по ID
  async show(cursor: IFileUnique, tx?: IPrismaTR): Promise<FileDto | null> {
    const prisma = tx ?? this.prisma;

    return prisma.file.findUnique({
      where: cursor,
    });
  }

  // Добавление файла
  async store(data: IFileCreate, tx?: IPrismaTR): Promise<FileDto> {
    const prisma = tx ?? this.prisma;

    return prisma.file.create({
      data,
    });
  }

  // Удаление файла
  async destroy(where: IFileUnique, tx?: IPrismaTR): Promise<FileDto> {
    const prisma = tx ?? this.prisma;

    return prisma.file.delete({
      where,
    });
  }
}
