import { Body, Controller, Get, HttpException, HttpStatus, Post, Param } from "@nestjs/common";
import {ActorService} from "../service/actor.service";
import {CodaService} from "../../../../coda/coda.service";
import { LocationAvailabilityDtosRequest, LocationAvailabilityDtosResponseBackend, LocationAvailabilitySavedDtosResponseBackend } from "@mtronic-llc/fahs-common-test";
import { BackendActorAvailabilityQuery } from '@mtronic-llc/fahs-common-test';
import { FahsService } from "../service/fahs.service";
@Controller("fahs")
export class FahsController {
    constructor (
        private readonly actorService: ActorService, 
        private readonly codaService: CodaService,
        private readonly fahsService: FahsService,
    ) {}

    @Get('getAvailabilityOfPlacesOfInterest')
    async getAvailabilityOfPlacesOfInterest(): Promise<LocationAvailabilityDtosResponseBackend> {
        try {
            //const ids: string[] = await this.codaService.getIdsOfPlacesWithLittleInterestOrMore(); //TODO: intercambiar por llamada a datos de prueba para desarrollo
            const ids: string[] = ['39925068', '38132540', /*'44521091', '35460354','51843505'*/]; //TODO: intercambiar por llamada a coda para produccion
            const input: BackendActorAvailabilityQuery = {ids};
            return await this.actorService.getAvailabilityOfPlacesOfInterest(input);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    'Error al obtener los datos del actor' + error.message,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    /*@Post('getAvailablePlacesFromRegions')
    async getAvailablePlacesFromRegions(@Body() body: BackendActorPlacesQuery): Promise<LocationsByRegion[]> {
        try {
            const { checkin, checkout, regions } = body;
            const DateFormat = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

            if (regions == undefined || regions.length == 0 || regions[0] == '') {
                throw new HttpException('No se especificaron regiones', 400);
            }

            if (checkin == undefined || checkout == undefined || !DateFormat.test(checkin) || !DateFormat.test(checkout)) {
                throw new HttpException('Formato de fecha inválido (YYYY-MM-DD)', 400);
            }

            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            
            if (checkinDate < currentDate || checkoutDate < currentDate) {
                throw new HttpException('Fechas inválidas', 400);
            }

            if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
                throw new HttpException('Alguna de las fechas no existe', 400);
            }

            return await this.actorService.getAvailablePlacesFromRegions(body);
        } catch (error) {
            console.error(error);
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    'Error al obtener los datos del actor',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }*/

    @Post('getAvailabilityOfPlacesOfInterestWithIds')
    async getAvailabilityOfPlacesOfInterestWithIds(@Body() body: BackendActorAvailabilityQuery): Promise<LocationAvailabilityDtosResponseBackend> {
        try {           
            return await this.actorService.getAvailabilityOfPlacesOfInterest(body);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    'Error al obtener los datos del actor',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    @Post('getAvailabilityOfSavedPlacesOfInterestWithIds')
    async getAvailabilityOfSavedPlacesOfInterestWithIds(@Body() body: LocationAvailabilityDtosRequest): Promise<LocationAvailabilitySavedDtosResponseBackend> {
        return await this.fahsService.getAvailabilityOfSavedPlacesOfInterestWithIds(body);
    }

    @Get('getPlacesDataByCodaPage/:page')
    async getPlacesDataByCodaPage(@Param('page') page: string): Promise<{host: string, id: string}[]> {
        try {
            return await this.codaService.getPlacesDataByPage(page);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    'Error al obtener los ids de la página',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
}
