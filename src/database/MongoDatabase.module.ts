import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceOfInterestAvailabilityModelService } from './availabilityOfPlaces/PlaceOfInterestAvailabilityModel.service';
import { AvailabilityOfPlaceOfInterestSchema } from './availabilityOfPlaces/PlaceOfInterestAvailability.schema';
import { PlaceOfInterestAvailabilityController } from './availabilityOfPlaces/PlaceOfInterestAvailabilityModel.controller';
import { CodaViewUpdateDate } from './availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.schema';
import { CodaViewUpdateDateService } from './availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.service';
import { CodaService } from 'src/coda/coda.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'PlaceOfInterestAvailability', schema: AvailabilityOfPlaceOfInterestSchema }, 
            { name: 'CodaViewUpdateDate', schema: CodaViewUpdateDate }]),
    ],
    providers: [PlaceOfInterestAvailabilityModelService, CodaViewUpdateDateService, CodaService],
    exports: [PlaceOfInterestAvailabilityModelService, CodaViewUpdateDateService]
})
export class MongoDatabaseModule {}
