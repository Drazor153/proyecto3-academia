import { AccessTokenGuard } from './accessToken.guard';
import { RolesGuard } from './roles.guard';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenGuard } from './refreshToken.guard';

export const AccessTokenMiddleware = () => [
  { provide: APP_GUARD, useClass: AccessTokenGuard },
  AccessTokenStrategy,
];
export const RefreshTokenMiddleware = () => [
  { provide: APP_GUARD, useClass: RefreshTokenGuard },
  RefreshTokenStrategy,
];
