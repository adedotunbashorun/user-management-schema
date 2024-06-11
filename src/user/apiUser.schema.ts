import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, Schema as MongooseSchema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { AccountDocument, SCHEMAS } from '..';
import { RoleDocument } from '../role/role.schema';
import { UserStatus } from '../types';

export type ApiUserDocument = ApiUser & Document;

@Schema({ timestamps: true })
export class ApiUser {
  @Prop()
  userName: string;

  @Prop({ required: true })
  secretKey: string;

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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const ApiUserSchema = SchemaFactory.createForClass(ApiUser);

ApiUserSchema.set('versionKey', '_version');
ApiUserSchema.plugin(updateIfCurrentPlugin);

export { ApiUserSchema };
