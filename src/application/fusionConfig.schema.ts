import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export type FusionConfigDocument = FusionConfig & Document;

@Schema({ timestamps: true })
export class FusionConfig {
  @Prop()
  forgotPasswordEmailTemplateId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const FusionConfigSchema = SchemaFactory.createForClass(FusionConfig);

FusionConfigSchema.set('versionKey', '_version');
FusionConfigSchema.plugin(updateIfCurrentPlugin);

export { FusionConfigSchema };
