import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateDriverInput } from './create-driver.input';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @Field({ nullable: true })
  status?: string;
}
