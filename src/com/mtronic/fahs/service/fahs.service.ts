import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PlaceOfInterestAvailabilityModelService } from "src/database/availabilityOfPlaces/PlaceOfInterestAvailabilityModel.service";
import { CodaViewUpdateDateService } from "src/database/availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.service";
import { MongoLocationAvailabilityDtos, LocationAvailabilityDtosRequest, LocationAvailabilityDtoErrorResponse, LocationAvailabilitySavedDtosResponseBackend } from "@mtronic-llc/fahs-common-test";
import { ActorService } from "./actor.service";
import { viewsId } from "src/utils/constants";

@Injectable()
export class FahsService {
    constructor(
        private readonly placeOfInterestAvailabilityModelService: PlaceOfInterestAvailabilityModelService,
        private readonly actorService: ActorService,
        private readonly codaViewUpdateDateService: CodaViewUpdateDateService
    ) {}
    
    public async getAvailabilityOfSavedPlacesOfInterestWithIds(requestData: LocationAvailabilityDtosRequest): Promise<LocationAvailabilitySavedDtosResponseBackend>  {
        const currentDate = new Date();
        let lastConsultationDate = new Date();
        const coda_view_id = viewsId[requestData.codaView];

        try {
            let allPlaces: Array<MongoLocationAvailabilityDtos | LocationAvailabilityDtoErrorResponse> = [];
            if (!requestData.refresh) {
                const savedPlaces = await this.placeOfInterestAvailabilityModelService.getPlacesOfInteresAvailabilitytByIds(requestData.ids);
                allPlaces = [...savedPlaces];
            }
            
            const idsToGet = requestData.refresh ? requestData.ids : 
            requestData.ids.filter(id => {
                const place = allPlaces.find(savedPlace => savedPlace.id === id);
                if (place && !(place instanceof LocationAvailabilityDtoErrorResponse)) {
                    const updatedDate = new Date(place.updatedAt);
                    const timeDifference = currentDate.getTime() - updatedDate.getTime();
                    //Los lugares que han sido actualizados hace más de 24 horas serán consultados de nuevo
                    return timeDifference > 24 * 60 * 60 * 1000;
                }
                return place ? false : true;
            });
        
            if (idsToGet.length > 0) {
                const newPlacesData = await this.actorService.getAvailabilityOfPlacesOfInterest({ids: idsToGet});
                newPlacesData.data.forEach(async placeData => {
                    if (placeData.response.kind === 'LocationAvailabilityDtos') {
                        const mongoPlaceData: MongoLocationAvailabilityDtos = {
                            ...placeData.response,
                            coda_view_id
                        }
                        allPlaces.push(mongoPlaceData);
                        this.placeOfInterestAvailabilityModelService.handleAvailabilityOfPlaceOfInterest(mongoPlaceData);
                    } else {
                        allPlaces.push(placeData.response);
                        this.placeOfInterestAvailabilityModelService.handleAvailabilityOfPlaceOfInterest(placeData.response)
                    }
                })
            }
        
            //Algoritmo de ordenamiento para ordenar lugares de acuerdo al orden en la vista de coda
            allPlaces.sort((a, b) => {
                const indexA = requestData.ids.indexOf(a.id);
                const indexB = requestData.ids.indexOf(b.id);
                return indexA - indexB;
            });
            if (requestData.refresh || idsToGet.length >= (requestData.ids.length / 2)) {
                await this.codaViewUpdateDateService.handleCodaViewUpdateData({
                    coda_view_id,
                    last_date: currentDate,
                    success: true
                });
                lastConsultationDate = currentDate;
            } else {
                const codaViewData = await this.codaViewUpdateDateService.getCodaViewUpdateDateWithId(coda_view_id);
                if (codaViewData && codaViewData.success) {
                    lastConsultationDate = codaViewData.last_date;
                } else {
                    await this.codaViewUpdateDateService.handleCodaViewUpdateData({
                        coda_view_id,
                        last_date: currentDate,
                        success: true
                    });
                    lastConsultationDate = currentDate;
                }
            }
            return {
                data: allPlaces,
                fechaDeConsulta: lastConsultationDate.toISOString()
            }
        } catch (error) {
            this.codaViewUpdateDateService.handleCodaViewUpdateData({
                coda_view_id,
                last_date: currentDate,
                success: false
            });
            console.log(error);
            throw new HttpException(
                'Error al obtener los ids guardados',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        } 
    }
}