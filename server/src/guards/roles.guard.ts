import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRequest } from 'src/interfaces/request.interface';
import { RoleEnum } from '../common/consts';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const request: UserRequest = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.role) {
      throw new UnauthorizedException('Invalid user');
    }

    return roles.includes(user.role);
  }
}
