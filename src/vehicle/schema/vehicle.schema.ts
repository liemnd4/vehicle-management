import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true, enum: ['motorbike', 'car'] })
  type: string;

  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop({ required: true, unique: true })
  licensePlate: string;

  @Prop()
  color: string;

  @Prop({ default: 'active', enum: ['active', 'inactive', 'maintenance'] })
  status: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
