import { ModelDefinition } from '@nestjs/mongoose';
import { ApiUser, ApiUserSchema } from './apiUser.schema';
import { User, UserSchema } from './user.schema';

export const userModels: ModelDefinition[] = [
  { name: User.name, schema: UserSchema },
  { name: ApiUser.name, schema: ApiUserSchema },
];
