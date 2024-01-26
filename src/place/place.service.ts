import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoPlaceSchema } from '@mtronic-llc/common'

@Injectable()
export class PlaceService {
    constructor(@InjectModel('Place') private placeModel: Model<MongoPlaceSchema>) {}

    async createPlace(place: MongoPlaceSchema): Promise<MongoPlaceSchema> {
        const createdPlace = new this.placeModel(place);
        return await createdPlace.save();
    }
}