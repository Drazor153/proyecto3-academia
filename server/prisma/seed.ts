import { PrismaClient } from '@prisma/client';
import { levels, groups } from './dataseed';

const prisma = new PrismaClient();

async function main() {
  // await prisma.level.createMany({
  //   data: levels
  // });

  // await prisma.group.createMany({
  //   data: groups
  // });

  // levels_groups.forEach(async (unit) => {
  //   await prisma.level.update({
  //     where: {
  //       id: unit.level_id
  //     },
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
  //     }
  //   });
  // });

  levels.forEach((level) => {
    groups.forEach(async (group) => {
      await prisma.level.upsert({
        where: {
          id: level.id
        },
        update: {
          ClassGroup: {
            create: {
              year: 2023,
              group: {
                connectOrCreate: {
                  where: {
                    letter: group.letter
                  },
                  create: {
                    letter: group.letter,
                    topic: group.topic
                  }
                }
              }
            }
          }
        },
        create: {
          id: level.id,
          name: level.name,
          ClassGroup: {
            create: {
              year: 2023,
              group: {
                connectOrCreate: {
                  where: {
                    letter: group.letter
                  },
                  create: {
                    letter: group.letter,
                    topic: group.topic
                  }
                }
              }
            }
          }
        }
      });
    });
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
