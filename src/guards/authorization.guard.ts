import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '../user/user.schema';
import { Request } from 'express';
import { isEmpty } from 'lodash';
import { AuthorizationService } from '../services/authorization.service';
import { Role } from 'src/role/role.schema';
import { UserRoleType } from 'src/types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as User;
    const organizationID = request.header('x-organization-id');

    // temp disable permission
    // return true;
    // users role is tied to an organization but none provided
    if (isEmpty(organizationID) && !isEmpty(user?.roles[0]?.account)) {
      return false;
    }

    return this.authorizationService.validatePermission(
      permissions,
      user?.roles[0] as Role,
    );
  }
}

@Injectable()
export class SuperAdmin implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as User;

    return (
      ((<Role>user.roles[0]).name.toLowerCase().includes('super admin') ||
        (<Role>user.roles[0]).name
          .toLowerCase()
          .includes('accountant general')) &&
      user.roleType === UserRoleType.Payroll
    );
  }
}
