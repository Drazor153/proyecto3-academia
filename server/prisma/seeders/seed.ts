import { PrismaClient } from '@prisma/client';
import { categories, lessonRecords, levels, targets, topics } from './dataseed';

const prisma = new PrismaClient();

async function main() {
  await prisma.level.createMany({
    data: levels,
  });
  await prisma.topic.createMany({
    data: topics,
  });
  // await prisma.lesson.createMany({
  //   data: lessonRecords,
  // });
  await prisma.period.createMany({
    data: [{
      year: 2023,
      semester: 1,
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-06-31'),
    },{
      year: 2023,
      semester: 2,
      start_date: new Date('2023-07-01'),
      end_date: new Date('2023-12-31'),
    },
    {
      year: 2022,
      semester: 1,
      start_date: new Date('2022-01-01'),
      end_date: new Date('2022-06-31'),
    },{
      year: 2022,
      semester: 2,
      start_date: new Date('2022-07-01'),
      end_date: new Date('2022-12-31'),
    }]
  })
  await prisma.target.createMany({
    data: targets,
  });

  await prisma.category.createMany({
    data: categories,
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
