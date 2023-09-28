import { PrismaClient } from '@prisma/client';
import { levels } from './dataseed';

const prisma = new PrismaClient();

async function main() {
  await prisma.level.createMany({
    data: levels
  });

  // await prisma.group.createMany({
  //   data: groups
  // });

  // levels_groups.forEach(async (unit) => {
  //   await prisma.level.update({
  //     data: {
  //       ClassGroup: {
  //         create: {
  //           year: 2023,
  //           group: {
  //             connect: {
  //               letter: unit.group_letter
  //             }
  //           }
  //         }
  //       }
  //     },
  //     where: {
  //       id: unit.level_id
  //     }
  //   });
  // });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
