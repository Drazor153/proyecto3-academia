import { Module, ModuleMetadata } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaModule } from '@/database/prisma.module';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [TeachersController],
  providers: [TeachersService],
};
@Module(moduleMetadata)
export class TeachersModule {}
