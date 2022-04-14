import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, Schema as MongooseSchema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { AccountStatus, AccountType, SCHEMAS } from '..';
import { MerchantDocument } from './merchant.schema';
import { AccountMetadataDocument } from '../metadata/accountMetadata.schema';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  type: AccountType;
  name: string;
  status: AccountStatus;
  metadata: PopulatedDoc<AccountMetadataDocument>[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.MERCHANT,
    required: true,
  })
  owner: PopulatedDoc<MerchantDocument>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.set('versionKey', '_version');
CustomerSchema.plugin(updateIfCurrentPlugin);

export { CustomerSchema };
