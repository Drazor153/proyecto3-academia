import { Module } from '@nestjs/common';
import { ConfigMiddleware, LoggerMiddleware } from './config/config';
import { PrismaModule } from './database/prisma.module';
import { ApiModule } from './api/api.module';
import { AccessTokenMiddleware, RefreshTokenMiddleware } from './guards';

@Module({
  imports: [ConfigMiddleware(), LoggerMiddleware(), PrismaModule, ApiModule],
  controllers: [],
  providers: [...AccessTokenMiddleware(), ...RefreshTokenMiddleware()],
})
export class AppModule {}
