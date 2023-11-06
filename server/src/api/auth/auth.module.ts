import { Module, ModuleMetadata } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@/config/config';
import { UsersRepository } from './repository/users';

export const moduleMetadata: ModuleMetadata = {
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: config().access_token_secret,
      signOptions: {
        expiresIn: config().access_token_expires_in,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
};
@Module(moduleMetadata)
export class AuthModule {}
