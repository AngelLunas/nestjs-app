import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoCodaViewUpdateDate } from "@mtronic-llc/fahs-common-test";

@Injectable()
export class CodaViewUpdateDateService {
    constructor(
        @InjectModel('CodaViewUpdateDate') private codaViewUpdateDate: Model<MongoCodaViewUpdateDate>
    ) {}

    async createCodaViewUpdateDate(codaViewUpdateDateData: MongoCodaViewUpdateDate): Promise<MongoCodaViewUpdateDate> {
        try {
            const newPlace = new this.codaViewUpdateDate(codaViewUpdateDateData);
            return await newPlace.save();
        } catch (error) {
            console.error('Error creando vista de coda:', error);
            throw error;
        }
    }

    async getAllCodaViewsUpdateDate(): Promise<MongoCodaViewUpdateDate[]> {
        return await this.codaViewUpdateDate.find().lean<MongoCodaViewUpdateDate[]>().exec();
    }

    async updateCodaView(coda_view_id: string, updateData: Partial<MongoCodaViewUpdateDate>): Promise<MongoCodaViewUpdateDate | null> {
        try {
            const updatedPlace = await this.codaViewUpdateDate.findOneAndUpdate({ coda_view_id }, updateData, { new: true }).exec();
            if (!updatedPlace) {
                return null;
            }
            return updatedPlace.toObject() as MongoCodaViewUpdateDate;
        } catch (error) {
            console.error('Error actualizando vista de coda:', error);
            throw error;
        }
    }

    async getCodaViewUpdateDateWithId(coda_view_id: string): Promise<MongoCodaViewUpdateDate>{
        return await this.codaViewUpdateDate.findOne({ coda_view_id }).exec();
    }

    async doesCodaViewUpdateDateExist(coda_view_id: string) {
        const count = await this.codaViewUpdateDate.countDocuments({ coda_view_id }).exec();
        return count > 0;
    }

    async handleCodaViewUpdateData(codaViewUpdateDateData: MongoCodaViewUpdateDate): Promise<MongoCodaViewUpdateDate> {
        let result = null;
        try {
            const placeExists = await this.doesCodaViewUpdateDateExist(codaViewUpdateDateData.coda_view_id);
            if (placeExists) {
                result = await this.updateCodaView(codaViewUpdateDateData.coda_view_id, codaViewUpdateDateData);
            } else {
                result = await this.createCodaViewUpdateDate(codaViewUpdateDateData);
            }
        } catch (error) {
            console.error('error manejando fechas de actualización de vistas de coda: ', error);
            throw error;
        }
        return result;
    }

    async deleteAllCodaViewUpdateDate(): Promise<{ deletedCount?: number }> {
        try {
            const result = await this.codaViewUpdateDate.deleteMany({});
            return { deletedCount: result.deletedCount };
        } catch (error) {
            console.error('Error eliminando vistas de coda', error);
            throw error;
        }
    }
}