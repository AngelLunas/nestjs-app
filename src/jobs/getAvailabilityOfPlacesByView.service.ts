import { Injectable } from "@nestjs/common";
import { PlaceOfInterestAvailabilityModelService } from "src/database/availabilityOfPlaces/PlaceOfInterestAvailabilityModel.service";
import { CodaService } from "src/coda/coda.service";
import { ActorService } from "src/com/mtronic/fahs/service/actor.service";
import { viewsId } from "src/utils/constants";
import { CodaViewUpdateDateService } from "src/database/availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.service";

@Injectable()
export class GetAvailabilityOfPlacesByViewService {
    constructor(
        private placeOfInterestAvailabilityModelService: PlaceOfInterestAvailabilityModelService,
        private codaViewUpdateDateService: CodaViewUpdateDateService,
        private codaService: CodaService,
        private ActorService: ActorService
    ) {}

    async getAvailabilityOfPlacesByView(executionDate: Date) {
        const savedData = [];
        const viewsToGet = ['interesenreservar', 'seleccionarinteresenreservar'];
        const placesData = [];
        let currentViewIndex = 0; 
        try {
            for ( ; currentViewIndex < viewsToGet.length; currentViewIndex++) {
                const codaRows = await this.codaService.getPlacesDataByPage(viewsToGet[currentViewIndex]);
                codaRows.forEach(codaRow => {
                    const placeExists = placesData.some(place => place.id === codaRow.id);
                    if (!placeExists) {
                        placesData.push({
                            id: codaRow.id,
                            view: viewsId[viewsToGet[currentViewIndex]]
                        })
                    }
                });
                this.codaViewUpdateDateService.handleCodaViewUpdateData({
                    coda_view_id: viewsId[viewsToGet[currentViewIndex]],
                    last_date: executionDate,
                    success: true
                });
            }
            const actorData = await this.ActorService.getAvailabilityOfPlacesOfInterest({
                ids: placesData.map(place => place.id)
            });
            for (const placeData of actorData.data) {
                if (placeData.response.kind === 'LocationAvailabilityDtos') {
                    const { kind, ...responseData } = placeData.response;
                    const coda_view_id = placesData.find(place => place.id === placeData.response.id).view;
                    const mongoPlaceData = {
                        ...responseData,
                        coda_view_id,
                    }
                    const mongoPlaceResult = await this.placeOfInterestAvailabilityModelService.handleAvailabilityOfPlaceOfInterest(mongoPlaceData);
                    savedData.push(mongoPlaceResult);
                }
            }
        } catch (e) {
            this.codaViewUpdateDateService.handleCodaViewUpdateData({
                coda_view_id: viewsId[viewsToGet[currentViewIndex]],
                last_date: executionDate,
                success: false
            });
            console.error(e);
            throw e;
        }
        return savedData;
    }
    
}