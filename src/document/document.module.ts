import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schema/document.schema';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Document.name, schema: DocumentSchema }]),
  ],
  providers: [DocumentService, DocumentResolver],
})
export class DocumentModule {}
