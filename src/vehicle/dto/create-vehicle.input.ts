import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';

@InputType()
export class CreateVehicleInput {
  @Field()
  @IsIn(['motorbike', 'car'])
  type: string;

  @Field({ nullable: true })
  @IsOptional()
  brand?: string;

  @Field({ nullable: true })
  @IsOptional()
  model?: string;

  @Field()
  @IsNotEmpty()
  licensePlate: string;

  @Field({ nullable: true })
  @IsOptional()
  color?: string;
}
