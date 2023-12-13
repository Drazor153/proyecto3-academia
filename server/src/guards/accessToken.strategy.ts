import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { config } from '@/config/config';
import { UserPayload } from '../interfaces/request.interface';

function cookieExtractor(req: Request) {
  if (req && req.cookies) {
    return req.cookies['access-token'];
  }
  return null;
}
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: config().access_token_secret,
    });
  }

  validate(payload: UserPayload) {
    return payload;
  }
}
