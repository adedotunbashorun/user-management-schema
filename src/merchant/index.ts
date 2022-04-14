import { ModelDefinition } from '@nestjs/mongoose';
import {
  MerchantSettings,
  MerchantSettingsSchema,
} from './merchantSettings.schema';
import {
  ProductSettings,
  ProductSettingsSchema,
} from './productSettings.schema';
import { Theme, ThemeSchema } from './theme.schema';

export const merchantModels: ModelDefinition[] = [
  { name: MerchantSettings.name, schema: MerchantSettingsSchema },
  { name: ProductSettings.name, schema: ProductSettingsSchema },
  { name: Theme.name, schema: ThemeSchema },
];
