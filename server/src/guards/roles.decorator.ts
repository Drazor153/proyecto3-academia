import { SetMetadata } from '@nestjs/common';

export enum RoleEnum {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
}

export const PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

export const REFRESH_KEY = 'refresh';
export const NoRefresh = () => SetMetadata(REFRESH_KEY, true);

export const ACCESS_KEY = 'access';
export const NoAccess = () => SetMetadata(ACCESS_KEY, true);
