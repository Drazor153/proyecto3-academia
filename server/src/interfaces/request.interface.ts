import { Request } from 'express';
import { RoleEnum } from 'src/auth/roles.decorator';

export interface UserRequest extends Request {
  user: {
    run: number;
    // dv: string;
    // name: string;
    // first_surname: string;
    // email?: string;
    role: RoleEnum;
    // status: string;
  };
}
