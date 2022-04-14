import { ModelDefinition } from '@nestjs/mongoose';
import { Role, RoleSchema } from './role.schema';

export const roleModels: ModelDefinition[] = [
  { name: Role.name, schema: RoleSchema },
];
