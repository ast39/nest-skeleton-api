import { EUserStatus, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const password: string = await bcrypt.hash('root', 10);

  // Базовые роли
  await prisma.role.createMany({
    data: [
      {
        roleName: 'admin',
        description: 'Администратор',
      },
      {
        roleName: 'moderator',
        description: 'Модератор',
      },
      {
        roleName: 'staff',
        description: 'Персонал',
      },
      {
        roleName: 'user',
        description: 'Пользователь',
      },
    ],
  });

  // Рутовый пользователь
  await prisma.user.createMany({
    data: [
      {
        email: 'root@gmail.com',
        firstName: 'Root',
        lastName: 'User',
        password: password,
        status: EUserStatus.ACTIVE,
      },
    ],
  });

  // Роли пользователей
  await prisma.userRoles.createMany({
    data: [
      {
        userId: 1,
        roleId: 1,
      },
      {
        userId: 1,
        roleId: 2,
      },
      {
        userId: 1,
        roleId: 3,
      },
      {
        userId: 1,
        roleId: 4,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
