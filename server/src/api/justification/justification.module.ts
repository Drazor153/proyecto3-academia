import { Module, ModuleMetadata } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { PrismaModule } from '@/database/prisma.module';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [JustificationController],
  providers: [JustificationService],
};

@Module(moduleMetadata)
export class JustificationModule {}
