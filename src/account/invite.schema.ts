import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { InviteStatus, SCHEMAS } from '..';
import { RoleDocument } from '../role/role.schema';
import { Schema as MongooseSchema, PopulatedDoc, Document } from 'mongoose';
import { AccountDocument } from './account.schema';
import { isEmail } from 'class-validator';
import { UserDocument } from '../user/user.schema';

export type InviteDocument = Invite & Document;

@Schema({ timestamps: true })
export class Invite {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  _version: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.ACCOUNT,
  })
  account: PopulatedDoc<AccountDocument>;

  @Prop({
    lowercase: true,
    validate: [isEmail, 'Please fill a valid email address'],
    required: true,
  })
  email: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.ROLE,
  })
  role: PopulatedDoc<RoleDocument>;

  @Prop({ required: true })
  token: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.USER,
  })
  invitedBy?: PopulatedDoc<UserDocument>;

  @Prop({ required: false })
  sentAt?: Date;

  @Prop({ required: false })
  expiresAt: Date;

  @Prop({
    enum: InviteStatus,
    required: true,
  })
  status: InviteStatus;
}

const InviteSchema = SchemaFactory.createForClass(Invite);

InviteSchema.set('versionKey', '_version');
InviteSchema.plugin(updateIfCurrentPlugin);

export { InviteSchema };
