import { Controller, Get } from "@nestjs/common";
import { PlaceService } from "./place.service";
import { MongoPlaceSchema } from "../../../common/common";

@Controller("place")
export class PlaceController {
    constructor (private readonly placeService: PlaceService) {}
    @Get('test')
    async createTestPlace(): Promise<MongoPlaceSchema> {
        return this.placeService.createPlace({id: '444321', city: 'Buenos Aires', country: 'Argentina'});
    }
}