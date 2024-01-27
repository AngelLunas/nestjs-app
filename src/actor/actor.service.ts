import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApifyClient } from "apify-client";
import { BackendActorPlacesQuery, BackendActorAvailabilityQuery } from '@mtronic-llc/common';

@Injectable()
export class ActorService {
    constructor (private configService: ConfigService) {}
    public async runActorPlacesQuery (input: BackendActorPlacesQuery): Promise<any> {
        try {
            const apiKey = this.configService.get<string>('APIFY_API_KEY');
            const client = new ApifyClient({token: apiKey});
            const run = await client.actor('ccJyNmz7QdWIahg10').call({
                ids: ['00000'],
                bplaces: true,
                regions: input.regions,
                checkin: input.checkin,
                checkout: input.checkout
            });
            const { items } = await client.dataset(run.defaultDatasetId).listItems();
            return items;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error al ejecutar el actor', 500);
        }
    }
    public async runActorAvailabilityQuery (input: BackendActorAvailabilityQuery): Promise<any> {
        try {
            const apiKey = this.configService.get<string>('APIFY_API_KEY');
            const client = new ApifyClient({token: apiKey});
            const run = await client.actor('ccJyNmz7QdWIahg10').call({
                ids: input.ids,
                bplaces: false
            });
            const { items } = await client.dataset(run.defaultDatasetId).listItems();
            return items;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error al ejecutar el actor', 500);
        }
    }
}