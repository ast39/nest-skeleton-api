import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({
    title: 'ID',
    description: 'ID файла',
    type: Number,
  })
  fileId: number;

  @ApiProperty({
    title: 'Имя',
    description: 'Имя файла',
    type: String,
  })
  fileName: string;

  @ApiProperty({
    title: 'Тип',
    description: 'Тип файла',
    type: String,
  })
  fileType: string;
}
