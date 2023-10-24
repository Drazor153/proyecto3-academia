import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'src/config/config';
import { Request } from 'express';

function cookieExtractor(req: Request) {
  if (req && req.cookies) {
    return req.cookies['refreshToken'];
  }
  return null;
}

export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config().refresh_token_secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    return payload;
  }
}
