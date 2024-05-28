import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, SchemaTypes, Types, Schema as MongooseSchema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { SCHEMAS } from '..';
import { AccountDocument } from '../account/account.schema';
import { PERMISSION } from './constants';

export type RoleDocument = Role & Document;


@Schema({ timestamps: false })
export class RolePermission extends Document {
  @Prop({
    type: String,
    required: true,
    text: true,
  })
  identifier: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: PERMISSION,
  })
  permission: Types.ObjectId;
}

const RolePermissionTypeSchema = SchemaFactory.createForClass(
  RolePermission,
);
@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, lowercase: true })
  name: string;

  @Prop({ lowercase: true })
  displayName: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.ACCOUNT,
    default: null,
  })
  owner?: PopulatedDoc<AccountDocument>;

  @Prop()
  description: string;

  @Prop({
    type: [RolePermissionTypeSchema],
    required: true,
  })
  permissions: [];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.set('versionKey', '_version');
RoleSchema.plugin(updateIfCurrentPlugin);


@Schema({ timestamps: true })
export class Permission extends Document {
  @Prop({
    type: String,
    required: true,
    text: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    text: true,
  })
  module: string;

  @Prop({
    type: String,
    required: true,
    text: true,
  })
  identifier: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  super: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: SCHEMAS.ACCOUNT,
    default: null,
  })
  createdBy: PopulatedDoc<AccountDocument>;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;

  @Prop({
    type: Date,
  })
  deletedAt: Date;
}

const PermissionSchema = SchemaFactory.createForClass(Permission);

export { RoleSchema, PermissionSchema, RolePermissionTypeSchema };