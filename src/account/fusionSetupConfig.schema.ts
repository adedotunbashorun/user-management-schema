import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FusionSetupConfigDocument = FusionSetupConfig & Document;

@Schema()
export class FusionSetupConfig {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  applicationId: string;

  @Prop({ required: true })
  clientKey: string;

  @Prop({ required: true })
  clientSecret: string;
}

const FusionSetupConfigSchema = SchemaFactory.createForClass(FusionSetupConfig);

export { FusionSetupConfigSchema };
