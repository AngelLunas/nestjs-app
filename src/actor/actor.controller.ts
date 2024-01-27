import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { BackendActorPlacesQuery } from '@mtronic-llc/common';

@Controller("actor")
export class ActorController {
    constructor(private readonly actorService: ActorService) {}
    @Get('data/availability')
    async runAvailability(): Promise<any> {
        try {
            const ids: string[] = ['51634704', '51020181', '824000980095369116'];
            const data: any = await this.actorService.runActorAvailabilityQuery({ids});
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

    @Get('data/places') 
    async runPlaces (): Promise<any> {
        //Fechas de prueba
        const today = new Date();
        const checkin = new Date(); //fecha de mañana
        checkin.setDate(today.getDate() + 1);
        const checkout = new Date(checkin); //fecha 6 días después de mañana
        checkout.setDate(checkin.getDate() + 6);

        const body: BackendActorPlacesQuery = {
            regions: ['Miami'],
            checkin: checkin.toISOString().split('T')[0],
            checkout: checkout.toISOString().split('T')[0]
        };
        
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
