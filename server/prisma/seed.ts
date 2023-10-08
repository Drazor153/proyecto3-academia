import { PrismaClient } from '@prisma/client';
import { lessonRecords, levels, topics } from './dataseed';

const prisma = new PrismaClient();

async function main() {
  await prisma.level.createMany({
    data: levels
  });
  await prisma.topic.createMany({
    data: topics
  });
  await prisma.lesson.createMany({
    data: lessonRecords
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
