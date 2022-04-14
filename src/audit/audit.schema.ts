import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export type AuditDocument = Audit & Document;

@Schema({ timestamps: true })
export class Audit {
  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true })
  actionBy: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  _version: number;
}

const AuditSchema = SchemaFactory.createForClass(Audit);

AuditSchema.set('versionKey', '_version');
AuditSchema.plugin(updateIfCurrentPlugin);

export { AuditSchema };
