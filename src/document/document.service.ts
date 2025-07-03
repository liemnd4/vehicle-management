import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, DocumentEntity } from './schema/document.schema';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name)
    private documentModel: Model<DocumentEntity>,
  ) {}

  async create(input: CreateDocumentInput): Promise<Document> {
    return this.documentModel.create(input);
  }

  async findAll(): Promise<Document[]> {
    return this.documentModel.find().populate('vehicleId').exec();
  }

  async findOne(id: string): Promise<Document> {
    const doc = await this.documentModel.findById(id).populate('vehicleId').exec();
    if (!doc) throw new NotFoundException(`Document ${id} not found`);
    return doc;
  }

  async update(id: string, input: UpdateDocumentInput): Promise<Document> {
    const updated = await this.documentModel.findByIdAndUpdate(id, input, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Document ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Document> {
    const deleted = await this.documentModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Document ${id} not found`);
    return deleted;
  }

  async findExpired(): Promise<Document[]> {
    return this.documentModel
      .find({ expiryDate: { $lte: new Date() } })
      .populate('vehicleId')
      .exec();
  }
}
