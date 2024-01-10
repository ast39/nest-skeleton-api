import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import { any } from 'joi';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Файлы')
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @ApiOperation({
    summary: 'Загрузка файла',
    description: 'Загрузка файла',
  })
  @ApiOkResponse({
    description: 'Загруженный файл',
    type: any,
    isArray: false,
    status: 201,
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  public async create(@UploadedFile() file) {
    return await this.fileService.createFile(file);
  }
}
