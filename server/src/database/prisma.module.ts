import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { StudentsRepo } from './repositories/student';

@Module({
  providers: [PrismaService, StudentsRepo],
  exports: [PrismaService, StudentsRepo],
})
export class PrismaModule {}
