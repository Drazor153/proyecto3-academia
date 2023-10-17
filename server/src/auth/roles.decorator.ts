import { SetMetadata } from '@nestjs/common';

export enum RoleEnum {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
}

export const PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
