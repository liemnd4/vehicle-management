import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber, IsOptional, IsEmail } from 'class-validator';

@InputType()
export class CreateDriverInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsPhoneNumber('VN')
  phone: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
