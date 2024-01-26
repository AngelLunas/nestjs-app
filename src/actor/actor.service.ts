import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApifyClient } from "apify-client";
import { ApifyActorInput, BackendActorPlacesQuery, BackendActorAvailabilityQuery, ActorQuery } from '@mtronic-llc/common';

@Injectable()
export class ActorService {
    constructor (private configService: ConfigService) {}
    public async runActor(input: BackendActorPlacesQuery | BackendActorAvailabilityQuery, query: ActorQuery): Promise<any> {
        try {
            const apiKey = this.configService.get<string>('APIFY_API_KEY');
            const client = new ApifyClient({token: apiKey});

            let ActorInput: ApifyActorInput;
            
            if (query == ActorQuery.AVAILABILITY && 'ids' in input) {
                ActorInput = {
                    ids: input.ids,
                    bplaces: false
                };
            } else if (query === ActorQuery.PLACES && 'regions' in input) {
                ActorInput = {
                    ids: ['00000'],
                    bplaces: true,
                    regions: input.regions,
                    checkin: input.checkin,
                    checkout: input.checkout
                };
            } else {
                throw new HttpException('La llamada no existe o faltan datos', 404);
            }

            const run = await client.actor('ccJyNmz7QdWIahg10').call(ActorInput);
            const { items } = await client.dataset(run.defaultDatasetId).listItems();
            return items;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error al ejecutar el actor', 500);
        }
    }
}