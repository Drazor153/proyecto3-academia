import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserCookie, UserRequest } from '../types/auth';

export const cookieJwtAuth = (req: UserRequest, res: Response, next: NextFunction) => {
  const token: string = req.cookies.token;
  if (!token) {
    res.status(401).json({type: 'msg', message: 'No token provided' });
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) {
      res.status(401).json({type: 'msg', message: 'Unauthorized' });
      return;
    }
    req.user = decoded as UserCookie;
    next();
  });
}