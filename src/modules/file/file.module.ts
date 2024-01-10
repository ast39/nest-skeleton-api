import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';

@Module({
  providers: [FileService, FileRepository],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
