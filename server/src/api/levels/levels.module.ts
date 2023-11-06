import { Module, ModuleMetadata } from '@nestjs/common';
import { LevelsController } from './levels.controller';
import { PrismaModule } from '@/database/prisma.module';
import { LevelsService } from './levels.service';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [LevelsController],
  providers: [LevelsService],
};
@Module(moduleMetadata)
export class LevelsModule {}
