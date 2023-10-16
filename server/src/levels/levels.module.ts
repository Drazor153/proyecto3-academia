import { Module } from '@nestjs/common';
import { LevelsController } from './levels.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LevelsService } from './levels.service';

@Module({
  imports: [PrismaModule],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
