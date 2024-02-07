import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ActorService } from "../service/actor.service";
import { CodaService } from "../../../../coda/coda.service";
import { BackendActorPlacesQuery, BackendActorAvailabilityQuery } from '@mtronic-llc/common';

@Controller("fahs")
export class FahsController {
    constructor (private readonly actorService: ActorService, private readonly codaService: CodaService) {}
    //TODO: cambiar metodo y logica a
    // @Get('getAvailabilityOfPlacesOfInterest/') - note: tal vez hay manera usar nombre de metodo por defecto
    //     async getAvailabilityOfPlacesOfInterest(): Promise<any> {
    @Get('getAvailabilityOfPlacesOfInterest')
    async getAvailabilityOfPlacesOfInterest(): Promise<any> {
        try {
            const ids: string[] = await this.codaService.getIdsOfPlacesWithLittleInterestOrMore();
            const input: BackendActorAvailabilityQuery = {ids};
            const data: any = await this.actorService.runActorAvailabilityQuery(input);
            //TODO: Derek implementar lógica de hooks en proyecto de api_availability_query para convertir en Object de
            // JSON que viene de Airbnb
            return data;
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

    @Post('getAvailablePlacesFromRegions')
    async getAvailablePlacesFromRegions(@Body() body: BackendActorPlacesQuery): Promise<any> {
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
        if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
            throw new HttpException('Alguna de las fechas no existe', 400);
        }

        try {
            const data: any = await this.actorService.runActorPlacesQuery(body);
            return data;
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
}
