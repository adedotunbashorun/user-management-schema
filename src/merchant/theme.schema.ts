import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export type ThemeDocument = Theme & Document;

@Schema({ timestamps: true })
export class Theme {
  @Prop({ required: true })
  primaryColor: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const ThemeSchema = SchemaFactory.createForClass(Theme);

ThemeSchema.set('versionKey', '_version');
ThemeSchema.plugin(updateIfCurrentPlugin);

export { ThemeSchema };
