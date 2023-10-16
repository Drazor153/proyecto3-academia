import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { config } from 'src/config/config';

function cookieExtractor(req: Request) {
  if (req && req.cookies) {
    return req.cookies['token'];
  }
  return null;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: config().access_token_secret,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
