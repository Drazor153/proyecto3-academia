import { Module } from '@nestjs/common';
import { ConfigMiddleware, LoggerMiddleware } from './config/config';
import { PrismaModule } from './database/prisma.module';
import { ApiModule } from './api/api.module';
import { AccessTokenMiddleware, RefreshTokenMiddleware } from './guards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigMiddleware(), LoggerMiddleware(), PrismaModule, ApiModule, ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), 'public/pdf'),
    serveRoot: '/pdf',
  })],
  controllers: [],
  providers: [...AccessTokenMiddleware(), ...RefreshTokenMiddleware()],
})
export class AppModule {}
