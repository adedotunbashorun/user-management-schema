import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, Schema as MongooseSchema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { isEmail } from 'validator';
import { AccountDocument, SCHEMAS } from '..';
import { UserMetadataDocument } from '../metadata/userMetadata.schema';
import { RoleDocument } from '../role/role.schema';
import { UserStatus, UserRoleTypes } from '../types';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  userName: string;

  @Prop({
    type: String,
    lowercase: true,
    required: true,
    validate: [isEmail, 'Please fill a valid email address'],
  })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: SCHEMAS.USER_METADATA }],
  })
  metadata: PopulatedDoc<UserMetadataDocument>[];

  @Prop()
  bvn: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.ACCOUNT,
    required: true,
  })
  account: PopulatedDoc<AccountDocument>;

  @Prop({ enum: UserStatus, required: true })
  status: UserStatus;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: SCHEMAS.ROLE }],
  })
  roles: PopulatedDoc<RoleDocument>[];

  @Prop({ required: true })
  blocked: boolean;

  @Prop({ required: true })
  blacklisted: boolean;

  @Prop()
  lastLoginIp: string;

  @Prop()
  failedLoginAttempts: number;

  @Prop({ required: true, enum: UserRoleTypes })
  roleType: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('versionKey', '_version');
UserSchema.plugin(updateIfCurrentPlugin);

export { UserSchema };
