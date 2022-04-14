import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export type AccountMetadataDocument = AccountMetadata & Document;

@Schema({ timestamps: true })
export class AccountMetadata {
  @Prop({
    required: true,
  })
  key: string;

  @Prop({
    required: true,
  })
  value: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const AccountMetadataSchema = SchemaFactory.createForClass(AccountMetadata);

AccountMetadataSchema.set('versionKey', '_version');
AccountMetadataSchema.plugin(updateIfCurrentPlugin);

export { AccountMetadataSchema };
