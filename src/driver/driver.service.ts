import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from './schema/driver.schema';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
  ) {}

  async create(input: CreateDriverInput): Promise<Driver> {
    return this.driverModel.create(input);
  }

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) throw new NotFoundException(`Driver ${id} not found`);
    return driver;
  }

  async update(id: string, input: UpdateDriverInput): Promise<Driver> {
    const updated = await this.driverModel.findByIdAndUpdate(id, input, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Driver ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Driver> {
    const deleted = await this.driverModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Driver ${id} not found`);
    return deleted;
  }
}
