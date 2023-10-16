import { Request } from 'express';

export interface UserRequest extends Request {
  user: {
    run: number;
    dv: string;
    name: string;
    first_surname: string;
    email?: string;
    role: string;
    status: string;
  };
}
