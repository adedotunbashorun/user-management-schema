import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductSettingsSchema, ThemeSchema } from '..';
import { ProductSettings } from './productSettings.schema';
import { Theme } from './theme.schema';

export type MerchantSettingsDocument = MerchantSettings & Document;

@Schema({ timestamps: true })
export class MerchantSettings {
  @Prop({
    type: ThemeSchema,
  })
  theme: Theme;

  @Prop({
    type: ProductSettingsSchema,
    required: true,
  })
  productSettings: ProductSettings;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const MerchantSettingsSchema = SchemaFactory.createForClass(MerchantSettings);

MerchantSettingsSchema.set('versionKey', '_version');
MerchantSettingsSchema.plugin(updateIfCurrentPlugin);

export { MerchantSettingsSchema };
