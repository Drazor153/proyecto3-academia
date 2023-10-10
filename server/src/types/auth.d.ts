import { Request } from "express";
export type LoginForm = {
  run: number;
  password: string;
};

export type UserCookie = {
  run: number;
  dv: string;
  name: string;
  first_surname: string;
  email: string | null;
  role: string;
  status: string;
}

export interface UserRequest extends Request {
  user?: UserCookie;
}