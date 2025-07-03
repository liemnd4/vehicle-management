import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DocumentService } from './document.service';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { VehicleType } from '../vehicle/vehicle.resolver';

@ObjectType()
export class DocumentType {
  @Field(() => ID)
  _id: string;

  @Field(() => VehicleType)
  vehicleId: any;

  @Field()
  type: string;

  @Field()
  documentUrl: string;

  @Field()
  expiryDate: Date;
}

@Resolver(() => DocumentType)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Mutation(() => DocumentType)
  createDocument(@Args('input') input: CreateDocumentInput) {
    return this.documentService.create(input);
  }

  @Query(() => [DocumentType])
  findAllDocuments() {
    return this.documentService.findAll();
  }

  @Query(() => DocumentType)
  findDocumentById(@Args('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Query(() => [DocumentType])
  findExpiredDocuments() {
    return this.documentService.findExpired();
  }

  @Mutation(() => DocumentType)
  updateDocument(
    @Args('id') id: string,
    @Args('input') input: UpdateDocumentInput,
  ) {
    return this.documentService.update(id, input);
  }

  @Mutation(() => DocumentType)
  deleteDocument(@Args('id') id: string) {
    return this.documentService.remove(id);
  }
}
