import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export type ProductSettingsDocument = ProductSettings & Document;

@Schema({ timestamps: true })
export class ProductSettings {
  @Prop({ required: true })
  originate: boolean;

  @Prop({ required: true })
  decide: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const ProductSettingsSchema = SchemaFactory.createForClass(ProductSettings);

ProductSettingsSchema.set('versionKey', '_version');
ProductSettingsSchema.plugin(updateIfCurrentPlugin);

export { ProductSettingsSchema };
