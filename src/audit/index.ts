import { ModelDefinition } from '@nestjs/mongoose';
import { Audit, AuditSchema } from './audit.schema';

export const auditModels: ModelDefinition[] = [
  { name: Audit.name, schema: AuditSchema },
];
