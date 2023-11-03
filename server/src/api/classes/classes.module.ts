import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ClassesRepository } from './repository/classes.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
})
export class ClassesModule {}
