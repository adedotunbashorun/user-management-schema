import { ModelDefinition } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './application.schema';
import { FusionConfig, FusionConfigSchema } from './fusionConfig.schema';

export const applicationModels: ModelDefinition[] = [
  { name: FusionConfig.name, schema: FusionConfigSchema },
  { name: Application.name, schema: ApplicationSchema },
];
