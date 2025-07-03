import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DriverService } from './driver.service';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class DriverType {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  status: string;
}

@Resolver(() => DriverType)
export class DriverResolver {
  constructor(private readonly driverService: DriverService) {}

  @Mutation(() => DriverType)
  createDriver(@Args('input') input: CreateDriverInput) {
    return this.driverService.create(input);
  }

  @Query(() => [DriverType])
  findAllDrivers() {
    return this.driverService.findAll();
  }

  @Query(() => DriverType)
  findDriverById(@Args('id') id: string) {
    return this.driverService.findOne(id);
  }

  @Mutation(() => DriverType)
  updateDriver(
    @Args('id') id: string,
    @Args('input') input: UpdateDriverInput,
  ) {
    return this.driverService.update(id, input);
  }

  @Mutation(() => DriverType)
  deleteDriver(@Args('id') id: string) {
    return this.driverService.remove(id);
  }
}
