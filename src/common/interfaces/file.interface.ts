import { Prisma, File } from '@prisma/client';

export interface IFile extends File {}

export type IFileCreate = Prisma.FileCreateInput;
export type IFileUnique = Prisma.FileWhereUniqueInput;
