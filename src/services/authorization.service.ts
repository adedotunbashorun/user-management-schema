import { Injectable } from '@nestjs/common';
import { Role } from 'src/role/role.schema';

@Injectable()
export class AuthorizationService {
  validatePermission(identifiers: string[], role: Role): boolean {
    return role.permissions.some((val: any) => {
      return identifiers.includes(val.identifier);
    });
  }
}
