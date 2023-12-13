import { Module, ModuleMetadata } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { PrismaModule } from '@/database/prisma.module';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [ClassesController],
  providers: [ClassesService],
};
@Module(moduleMetadata)
export class ClassesModule {}
