import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceOfInterestAvailabilityModelService } from './availabilityOfPlaces/PlaceOfInterestAvailabilityModel.service';
import { AvailabilityOfPlaceOfInterestSchema } from './availabilityOfPlaces/PlaceOfInterestAvailability.schema';
import { CodaViewUpdateDate } from './availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.schema';
import { CodaViewUpdateDateService } from './availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'PlaceOfInterestAvailability', schema: AvailabilityOfPlaceOfInterestSchema }, 
            { name: 'CodaViewUpdateDate', schema: CodaViewUpdateDate }])
    ],
    providers: [PlaceOfInterestAvailabilityModelService, CodaViewUpdateDateService],
    exports: [PlaceOfInterestAvailabilityModelService, CodaViewUpdateDateService]
})
export class MongoDatabaseModule {}
