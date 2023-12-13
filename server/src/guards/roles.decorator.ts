import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../common/consts';



export const PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

export const REFRESH_KEY = 'refresh';
export const NoRefresh = () => SetMetadata(REFRESH_KEY, true);

export const ACCESS_KEY = 'access';
export const NoAccess = () => SetMetadata(ACCESS_KEY, true);
