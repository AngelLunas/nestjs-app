import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PlaceOfInterestAvailabilityModelService } from "src/database/availabilityOfPlaces/PlaceOfInterestAvailabilityModel.service";
import { CodaViewUpdateDateService } from "src/database/availabilityOfPlaces/codaViewUpdateDate/CodaViewUpdateDate.service";
import { MongoLocationAvailabilityDtos, LocationAvailabilityDtosRequest, LocationAvailabilityDtoErrorResponse, LocationAvailabilitySavedDtosResponseBackend, CodaRow } from "@mtronic-llc/fahs-common-test";
import { ActorService } from "./actor.service";
import { viewsId } from "src/utils/constants";
import { CodaService } from "src/coda/coda.service";

@Injectable()
export class FahsService {
    constructor(
        private readonly placeOfInterestAvailabilityModelService: PlaceOfInterestAvailabilityModelService,
        private readonly actorService: ActorService,
        private readonly codaService: CodaService,
        private readonly codaViewUpdateDateService: CodaViewUpdateDateService
    ) {}

    public async getPlacesAvailabilityByCodaView(request: {codaView: string, refresh: boolean}) {
        try {
            const codaRows = await this.codaService.getPlacesDataByPage(request.codaView);
            return this.getPlacesAvailability(request.codaView, codaRows, request.refresh);
        } catch (error) {
            console.error('Error obteniendo disponiblidad de lugares por vista', error);
            throw error;
        }
    }
    
    public async getPlacesAvailability(codaView: string, codaRows: CodaRow[], refresh: boolean): Promise<LocationAvailabilitySavedDtosResponseBackend>  {
        const currentDate = new Date();
        let lastConsultationDate = new Date();
        const coda_view_id = viewsId[codaView];
        const ids = codaRows.map(codaRow => codaRow.id);
        let savedPlaces: Array<MongoLocationAvailabilityDtos> = [];
        try {
            let allPlaces: Array<MongoLocationAvailabilityDtos | LocationAvailabilityDtoErrorResponse> = [];
            if (!refresh) {
                savedPlaces = await this.placeOfInterestAvailabilityModelService.getPlacesOfInteresAvailabilitytByIds(ids);
                allPlaces = [...savedPlaces];
            }
            
            const idsToGet = refresh ? ids : 
            ids.filter(id => {
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
                    const codaRow = codaRows.find(codaRow => codaRow.id === placeData.response.id);
                    if (placeData.response.kind === 'LocationAvailabilityDtos') {
                        const mongoPlaceData: MongoLocationAvailabilityDtos = {
                            ...placeData.response,
                            coda_view_id,
                            host: codaRow.host,
                            rowID: codaRow.rowID,
                            active: true
                        }
                        allPlaces.push(mongoPlaceData);
                        this.placeOfInterestAvailabilityModelService.handleAvailabilityOfPlaceOfInterest(mongoPlaceData);
                    } else {
                        const mongoPlaceData = {
                            ...placeData.response,
                            coda_view_id,
                            host: codaRow.host,
                            rowID: codaRow.rowID,
                            active: false
                        }
                        allPlaces.push(mongoPlaceData);
                        this.placeOfInterestAvailabilityModelService.handleAvailabilityOfPlaceOfInterest(mongoPlaceData);
                    }
                })
            }
        
            //Algoritmo de ordenamiento para ordenar lugares de acuerdo al orden en la vista de coda
            allPlaces.sort((a, b) => {
                const indexA = ids.indexOf(a.id);
                const indexB = ids.indexOf(b.id);
                return indexA - indexB;
            });
            if (refresh || idsToGet.length >= (ids.length / 2)) {
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