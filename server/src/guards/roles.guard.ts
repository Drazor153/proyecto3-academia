import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles';
import { UserRequest } from 'src/interfaces/request.interface';
import { RoleEnum } from '../common/constants';

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

    const request = context.switchToHttp().getRequest() as UserRequest;
    const user = request.user;
    if (!user || !user.role) {
      throw new UnauthorizedException({msg:'invalid_user'});
    }

    return roles.includes(user.role);
  }
}
