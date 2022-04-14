import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export type UserMetadataDocument = UserMetadata & Document;

@Schema({ timestamps: true })
export class UserMetadata {
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

const UserMetadataSchema = SchemaFactory.createForClass(UserMetadata);

UserMetadataSchema.set('versionKey', '_version');
UserMetadataSchema.plugin(updateIfCurrentPlugin);

export { UserMetadataSchema };
