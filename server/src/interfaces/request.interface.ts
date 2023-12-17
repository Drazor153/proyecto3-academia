import { Request } from 'express';
import { RoleEnum } from '../common/constants';
export interface UserPayload {
  sub: number;
  role: RoleEnum;
  refreshToken: string;
}

export interface UserRequest extends Request {
  user: UserPayload;
}
