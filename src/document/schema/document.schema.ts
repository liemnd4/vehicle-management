import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MDocument, Types } from 'mongoose';

export type DocumentEntity = Document & MDocument;

@Schema({ timestamps: true })
export class Document {
  @Prop({ type: Types.ObjectId, ref: 'Vehicle', required: true })
  vehicleId: Types.ObjectId;

  @Prop({ required: true, enum: ['registration', 'insurance', 'inspection'] })
  type: string;

  @Prop({ required: true })
  documentUrl: string;

  @Prop({ required: true })
  expiryDate: Date;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
