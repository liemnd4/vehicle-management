import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl, IsDateString, IsIn } from 'class-validator';

@InputType()
export class CreateDocumentInput {
  @Field(() => ID)
  @IsNotEmpty()
  vehicleId: string;

  @Field()
  @IsIn(['registration', 'insurance', 'inspection'])
  type: string;

  @Field()
  @IsUrl()
  documentUrl: string;

  @Field()
  @IsDateString()
  expiryDate: string;
}
