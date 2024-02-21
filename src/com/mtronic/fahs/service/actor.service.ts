import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApifyClient } from "apify-client";
import { BackendActorPlacesQuery, BackendActorAvailabilityQuery } from '@mtronic-llc/common';

@Injectable()
export class ActorService {
    constructor (private configService: ConfigService) {}
    public async getAvailablePlacesFromRegions (input: BackendActorPlacesQuery): Promise<any> {
        try {
            const apifyApiKey = this.configService.get<string>('APIFY_API_KEY');
            const apifyClient = new ApifyClient({token: apifyApiKey});
            const runActor = await apifyClient.actor('ccJyNmz7QdWIahg10').call({
                ids: ['00000'],
                bplaces: true,
                regions: input.regions,
                checkin: input.checkin,
                checkout: input.checkout
            });

            const { items } = await apifyClient.dataset(runActor.defaultDatasetId).listItems();
            return items;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error al ejecutar el actor', 500);
        }
    }
   //TODO: Derek - cambiar el retorno de este metodo de any a objecto de JSON que viene de Airbnb
    public async getAvailabilityOfPlacesOfInterest (input: BackendActorAvailabilityQuery): Promise<any> {
        try {
            const apifyApiKey = this.configService.get<string>('APIFY_API_KEY');

            const apifyClient = new ApifyClient({token: apifyApiKey});
            const runActor = await apifyClient.actor('ccJyNmz7QdWIahg10').call({
                ids: input.ids,
                bplaces: false
            });
            const { items: airbnbPlaceCalendarObjects  } = await apifyClient.dataset(runActor.defaultDatasetId).listItems();
           return airbnbPlaceCalendarObjects;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error al ejecutar el actor', 500);
        }
    }
}
