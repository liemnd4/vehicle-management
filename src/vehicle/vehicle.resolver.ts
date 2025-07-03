import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './schema/vehicle.schema';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

import { Types } from 'mongoose';
import { ParseUUIDPipe } from '@nestjs/common';
import { ID, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VehicleType {
  @Field(() => String)
  _id: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  model?: string;

  @Field()
  licensePlate: string;

  @Field({ nullable: true })
  color?: string;

  @Field()
  status: string;
}

@Resolver(() => VehicleType)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Mutation(() => VehicleType)
  createVehicle(@Args('input') input: CreateVehicleInput) {
    return this.vehicleService.create(input);
  }

  @Query(() => [VehicleType])
  findAllVehicles() {
    return this.vehicleService.findAll();
  }

  @Query(() => VehicleType)
  findVehicleById(@Args('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Mutation(() => VehicleType)
  updateVehicle(
    @Args('id') id: string,
    @Args('input') input: UpdateVehicleInput,
  ) {
    return this.vehicleService.update(id, input);
  }

  @Mutation(() => VehicleType)
  deleteVehicle(@Args('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
