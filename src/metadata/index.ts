import { ModelDefinition } from '@nestjs/mongoose';
import {
  AccountMetadata,
  AccountMetadataSchema,
} from './accountMetadata.schema';
import { UserMetadata, UserMetadataSchema } from './userMetadata.schema';

export const metadataModels: ModelDefinition[] = [
  { name: AccountMetadata.name, schema: AccountMetadataSchema },
  { name: UserMetadata.name, schema: UserMetadataSchema },
];
