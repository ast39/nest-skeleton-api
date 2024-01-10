import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { FileDto } from './dto/file.dto';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private fileRepo: FileRepository) {}

  // Загрузка файла на серве
  upload(file): string {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(
        'Ошибка загрузки файла ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Добавление файла а БД
  async createFile(file: any): Promise<FileDto> {
    const fileName = this.upload(file);

    return await this.fileRepo.store({
      fileName: fileName,
      fileType: 'jpg',
    });
  }
}
