import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, Schema as MongooseSchema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { AccountStatus, AccountType } from '../types';
import { SCHEMAS } from '..';
import { AccountMetadataDocument } from '../metadata/accountMetadata.schema';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true, discriminatorKey: 'type' })
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: [SCHEMAS.MERCHANT, SCHEMAS.CUSTOMER],
  })
  type: AccountType;

  @Prop({
    enum: AccountStatus,
    required: true,
  })
  status: AccountStatus;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: SCHEMAS.ACCOUNT_METADATA },
    ],
    required: true,
  })
  metadata: PopulatedDoc<AccountMetadataDocument>[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.set('versionKey', '_version');
AccountSchema.plugin(updateIfCurrentPlugin);

export { AccountSchema };
