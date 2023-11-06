import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from '@/config/config';
import { Request } from 'express';

function cookieExtractor(req: Request) {
  if (req && req.cookies) {
    return req.cookies['refresh-token'];
  }
  return null;
}

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: config().refresh_token_secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.cookies['refresh-token'];
    return { ...payload, refreshToken };
  }
}
