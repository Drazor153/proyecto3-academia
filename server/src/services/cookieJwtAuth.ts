import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserCookie, UserRequest } from '../types/auth';
import { access_token_secret } from './config'

export const cookieJwtAuth = (req: UserRequest, res: Response, next: NextFunction) => {
  const token: string = req.cookies.token;
  if (!token) {
    res.status(401).json({type: 'msg', message: 'No token provided' });
    return;
  }

  jwt.verify(token, access_token_secret, (err, decoded) => {
    if (err) {
      res.status(401).json({type: 'msg', message: 'Unauthorized' });
      return;
    }
    req.user = decoded as UserCookie;
    next();
  });
}