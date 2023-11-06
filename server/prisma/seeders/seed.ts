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
  await prisma.lesson.createMany({
    data: lessonRecords,
  });
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
