import { Controller, Get } from "@nestjs/common";
import { PlaceOfInterestAvailabilityModelService } from "./PlaceOfInterestAvailabilityModel.service";
import { AvailabilityOfPlaceOfInterestSchema } from "./PlaceOfInterestAvailability.schema";
import { CodaViewUpdateDateService } from "./codaViewUpdateDate/CodaViewUpdateDate.service";

@Controller('places')
export class PlaceOfInterestAvailabilityController {
    constructor (
        private placeOfInterestAvailabilityModelService: PlaceOfInterestAvailabilityModelService,
        private codaViewUpdateDateService: CodaViewUpdateDateService
    ) {}

    @Get('getAvailabilityOfPlaces')
    async getAvailabilityOfPlaces () {
        return await this.placeOfInterestAvailabilityModelService.getAllPlacesOfInterestAvailability();
    }

    @Get('delete')
    async deletePlaces () {
        return await this.placeOfInterestAvailabilityModelService.deleteAllPlacesOfInterestAvailability();
    }
}
