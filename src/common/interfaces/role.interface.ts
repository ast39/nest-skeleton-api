import { Prisma, Role } from '@prisma/client';

export interface IRole extends Role {}

export type IRoleCreate = Prisma.RoleCreateInput;
export type IRoleUpdate = Prisma.RoleUpdateInput;
export type IRoleFilter = Prisma.RoleWhereInput;
export type IRoleUnique = Prisma.RoleWhereUniqueInput;
export type IRoleOrder = Prisma.RoleOrderByWithRelationInput;
