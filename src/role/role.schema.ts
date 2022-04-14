import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, Schema as MongooseSchema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Permissions, SCHEMAS } from '..';
import { ApplicationDocument } from '../application/application.schema';
import { AccountDocument } from '../account/account.schema';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  id: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: SCHEMAS.APPLICATION }],
  })
  applications: PopulatedDoc<ApplicationDocument>[];

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

  @Prop({ type: MongooseSchema.Types.Array })
  permissions: Permissions[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.set('versionKey', '_version');
RoleSchema.plugin(updateIfCurrentPlugin);

export { RoleSchema };
