import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LocationAvailabilityDtoErrorResponse, MongoLocationAvailabilityDtos } from "@mtronic-llc/fahs-common-test";

@Injectable()
export class PlaceOfInterestAvailabilityModelService {
    constructor(
        @InjectModel('PlaceOfInterestAvailability') private placeOfInterestAvailabilityModel: Model<MongoLocationAvailabilityDtos>, 
    ) {}

    async createPlacesOfInterestAvailability(placeOfInterestAvailability: MongoLocationAvailabilityDtos | LocationAvailabilityDtoErrorResponse): Promise<MongoLocationAvailabilityDtos> {
        try {
            const newPlace = new this.placeOfInterestAvailabilityModel({...placeOfInterestAvailability, active: placeOfInterestAvailability instanceof LocationAvailabilityDtoErrorResponse ? false : true});
            return await newPlace.save();
        } catch (error) {
            console.error('Error creando el lugar de interés:', error);
            throw error;
        }
    }

    async getAllPlacesOfInterestAvailability(): Promise<MongoLocationAvailabilityDtos[]> {
        const results = await this.placeOfInterestAvailabilityModel.find().lean<MongoLocationAvailabilityDtos[]>().exec();
        return results;
    }

    async doesPlaceOfInterestExist(id: string): Promise<boolean> {
        const count = await this.placeOfInterestAvailabilityModel.countDocuments({ id }).exec();
        return count > 0;
    }

    async updatePlaceOfInterestAvailability(id: string, updateData: Partial<MongoLocationAvailabilityDtos | LocationAvailabilityDtoErrorResponse>): Promise<MongoLocationAvailabilityDtos | null> {
        try {
            const updatedPlace = await this.placeOfInterestAvailabilityModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
            if (!updatedPlace) {
                return null;
            }
            return updatedPlace.toObject() as MongoLocationAvailabilityDtos;
        } catch (error) {
            // Manejo de errores
            console.error('Error actualizando el lugar de interés:', error);
            throw error;
        }
    }

    async getPlacesOfInteresAvailabilitytByIds(ids: string[]){
        const result = await this.placeOfInterestAvailabilityModel.find({ id: { $in: ids } }).exec();
        return result;
    }

    async deleteAllPlacesOfInterestAvailability(): Promise<{ deletedCount?: number }> {
        try {
            const result = await this.placeOfInterestAvailabilityModel.deleteMany({});
            return { deletedCount: result.deletedCount };
        } catch (error) {
            console.error('Error eliminando todos los lugares de interés:', error);
            throw error;
        }
    }

    async handleAvailabilityOfPlaceOfInterest(availabilityOfPlaceOfInterest: MongoLocationAvailabilityDtos | LocationAvailabilityDtoErrorResponse) {
        try {
            const placeExists = await this.doesPlaceOfInterestExist(availabilityOfPlaceOfInterest.id);
            if (placeExists) {
                await this.updatePlaceOfInterestAvailability(availabilityOfPlaceOfInterest.id, availabilityOfPlaceOfInterest);
            } else {
                await this.createPlacesOfInterestAvailability(availabilityOfPlaceOfInterest);
            }
        } catch (error) {
            console.error('error manejando disponibilidad de lugar de interés: ', error);
            throw error;
        }
    }
}