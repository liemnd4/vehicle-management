import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DriverDocument = Driver & Document;

@Schema({ timestamps: true })
export class Driver {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  phone: string;

  @Prop()
  email?: string;

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  status: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
