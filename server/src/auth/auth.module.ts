import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { BcryptService } from 'src/services/bcrypt.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: config().access_token_secret,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
