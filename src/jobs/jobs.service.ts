import { Injectable } from "@nestjs/common";
import { PlaceOfInterestAvailabilityModelService } from "src/database/availabilityOfPlaces/PlaceOfInterestAvailabilityModel.service";
import { CodaService } from "src/coda/coda.service";
import { ActorService } from "src/com/mtronic/fahs/service/actor.service";
import { viewsId } from "src/utils/constants";
import { CodaViewUpdateDateService } from "src/database/availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.service";
import { LocationAvailabilityDtosResponseBackend } from "@mtronic-llc/fahs-common-test";

@Injectable()
export class JobService {
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
                            rowID: codaRow.rowID,
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
                    const codaRow = placesData.find(place => place.id === placeData.response.id);
                    const mongoPlaceData = {
                        ...responseData,
                        coda_view_id: codaRow.view,
                        rowID: codaRow.rowID,
                        active: true
                    }
                    await this.placeOfInterestAvailabilityModelService.handleAvailabilityOfPlaceOfInterest(mongoPlaceData);
                    savedData.push(mongoPlaceData);
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

    async getAvailabilityOfUnavailablePlaces(): Promise<LocationAvailabilityDtosResponseBackend> {
        try {
            const unavailablePlacesData = await this.codaService.getPlacesDataByPage('lugaresinactivos');
            const unavailableSavedPlacesData = await this.placeOfInterestAvailabilityModelService.getUnavailablePlaces();
            const combinedArray = [...unavailablePlacesData, ...unavailableSavedPlacesData];
            const places = combinedArray.filter((place, index, self) =>
                index === self.findIndex((p) => p.id === place.id)
            );
            
            const actorData = await this.ActorService.getAvailabilityOfPlacesOfInterest({
                ids: places.map(place => place.id)
            });
            actorData.data.forEach(async availabilityOfPlace => {
                if (availabilityOfPlace.response.kind === 'LocationAvailabilityDtos') {
                    const { kind, ...responseData } = availabilityOfPlace.response;
                    const savedRow = places.find(place => place.id === availabilityOfPlace.response.id);
                    const mongoPlaceData = {
                        ...responseData,
                        coda_view_id: viewsId['lugaresinactivos'],
                        rowID: savedRow.rowID,
                        active: true
                    };
                    await this.placeOfInterestAvailabilityModelService.handleAvailabilityOfPlaceOfInterest(mongoPlaceData);
                    await this.codaService.placeAvailabileAgainCodaWebHook(savedRow.rowID, responseData.id, savedRow.host, availabilityOfPlace.response.meses);
                }
            })
            return actorData;
        } catch (error) {
            //console.error('error obteniendo disponibilidad de lugares inactivos' + error);
            throw error;
        }
    }
    
}