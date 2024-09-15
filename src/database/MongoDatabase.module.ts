import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceOfInterestAvailabilityModelService } from './availabilityOfPlaces/PlaceOfInterestAvailabilityModel.service';
import { AvailabilityOfPlaceOfInterestSchema } from './availabilityOfPlaces/PlaceOfInterestAvailability.schema';
import { PlaceOfInterestAvailabilityController } from './availabilityOfPlaces/PlaceOfInterestAvailabilityModel.controller';
import { CodaViewUpdateDate } from './availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.schema';
import { CodaViewUpdateDateService } from './availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.service';
import { CodaViewUpdateDateController } from './availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'PlaceOfInterestAvailability', schema: AvailabilityOfPlaceOfInterestSchema }, 
            { name: 'CodaViewUpdateDate', schema: CodaViewUpdateDate }])
    ],
    /*controllers: [PlaceOfInterestAvailabilityController, CodaViewUpdateDateController],*/
    providers: [PlaceOfInterestAvailabilityModelService, CodaViewUpdateDateService],
    exports: [PlaceOfInterestAvailabilityModelService, CodaViewUpdateDateService]
})
export class MongoDatabaseModule {}
