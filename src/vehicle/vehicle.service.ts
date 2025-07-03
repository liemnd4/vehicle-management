import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schema/vehicle.schema';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createVehicleInput: CreateVehicleInput): Promise<Vehicle> {
    return this.vehicleModel.create(createVehicleInput);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) {
        throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

    async update(id: string, updateVehicleInput: UpdateVehicleInput): Promise<Vehicle> {
    const updated = await this.vehicleModel.findByIdAndUpdate(id, updateVehicleInput, { new: true }).exec();
    if (!updated) {
        throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return updated;
    }

    async remove(id: string): Promise<Vehicle> {
    const deleted = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!deleted) {
        throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return deleted;
    }
}
