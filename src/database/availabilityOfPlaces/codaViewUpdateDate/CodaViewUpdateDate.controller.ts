import { Controller, Get } from "@nestjs/common";
import { CodaViewUpdateDateService } from "./CodaViewUpdateDate.service";

@Controller('viewsUpdateDate')
export class CodaViewUpdateDateController {
    constructor (
        private codaViewUpdateDateService: CodaViewUpdateDateService
    ) {}

    @Get('getAllCodaViews')
    async getAvailabilityOfPlaces () {
        return await this.codaViewUpdateDateService.getAllCodaViewsUpdateDate();
    }

    @Get('delete')
    async deletePlaces () {
        return await this.codaViewUpdateDateService.deleteAllCodaViewUpdateDate();
    }
}
