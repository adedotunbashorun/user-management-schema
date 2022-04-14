import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Permissions, SCHEMAS } from '..';
import { RoleDocument } from '../role/role.schema';
import { Schema as MongooseSchema, PopulatedDoc, Document } from 'mongoose';
import { FusionConfig, FusionConfigSchema } from './fusionConfig.schema';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop()
  name: string;

  @Prop({ type: FusionConfigSchema })
  fusionConfig?: FusionConfig;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: SCHEMAS.ROLE }] })
  roles: PopulatedDoc<RoleDocument>[];

  @Prop({ type: MongooseSchema.Types.Array })
  permissions: Permissions[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const ApplicationSchema = SchemaFactory.createForClass(Application);

ApplicationSchema.set('versionKey', '_version');
ApplicationSchema.plugin(updateIfCurrentPlugin);

export { ApplicationSchema };
