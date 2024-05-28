import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, Schema as MongooseSchema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { isEmail } from 'validator';
import { AccountStatus, AccountType, SCHEMAS } from '..';
import { MerchantSettingsDocument } from '../merchant/merchantSettings.schema';
import { AccountMetadataDocument } from '../metadata/accountMetadata.schema';

export type MerchantDocument = Merchant & Document;

@Schema({ timestamps: true })
export class Merchant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  _version: number;

  type: AccountType;
  name: string;
  status: AccountStatus;
  metadata: PopulatedDoc<AccountMetadataDocument>[];

  @Prop({ required: true, index: true, lowercase: true })
  slug: string;

  @Prop({
    lowercase: true,
    validate: [isEmail, 'Please fill a valid email address'],
  })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  businessRCNumber: string;

  @Prop()
  logoUrl: string;

  @Prop()
  faviconUrl: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.MERCHANT_SETTINGS,
  })
  settings: PopulatedDoc<MerchantSettingsDocument>;
}

const MerchantSchema = SchemaFactory.createForClass(Merchant);

MerchantSchema.set('versionKey', '_version');
MerchantSchema.plugin(updateIfCurrentPlugin);

export { MerchantSchema };
