import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { CodaService } from "../coda/coda.service";
import { BackendActorPlacesQuery, ActorQuery } from "../../../common/common";

@Controller("actor")
export class ActorController {
    constructor(private readonly actorService: ActorService, private readonly codaService: CodaService) {}
    @Get('data/availability/:page')
    async runAvailability(@Param('page') page: string): Promise<any> {
        try {
            const ids: string[] = await this.codaService.getIdsPage(page);
            const data: any = await this.actorService.runActor({ids}, ActorQuery.AVAILABILITY);
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

    @Post('data/places') 
    async runPlaces(@Body() body: BackendActorPlacesQuery): Promise<any> {
        const { checkin, checkout, regions } = body;
        const DateFormat = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    
        if (regions == undefined || regions.length == 0 || regions[0] == '') {
            throw new HttpException('No se especificaron regiones', 400);
        }

        if (checkin == undefined || checkout == undefined || !DateFormat.test(checkin) || !DateFormat.test(checkout)) {
            throw new HttpException('Formato de fecha inválido (YYYY-MM-DD)', 400);
        } 
        
        try {
            const data: any = await this.actorService.runActor({regions, checkin, checkout}, ActorQuery.PLACES);
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
