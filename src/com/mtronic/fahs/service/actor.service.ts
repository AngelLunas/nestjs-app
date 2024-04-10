import {HttpException, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {ApifyClient} from "apify-client";
import {LocationAvailabilityDtos, BackendActorAvailabilityQuery, BackendActorPlacesQuery} from '@mtronic-llc/common';
import axios from "axios";
import {AirbnbLocationCalendarErrorDto} from "../dto/actor/airbnb-location-calendar.dto-ERROR";
import {AirbnbLocationCalendarDto} from "../dto/actor/airbnb-location-calendar.dto";
import {getActorServerUrl} from "../../../../utils/utils";
import {AirbnbCalendarMapper} from "../mapper/airbnb-calendar.mapper";

@Injectable()
export class ActorService {
    constructor (private configService: ConfigService, private airbnbCalendarMapper: AirbnbCalendarMapper) {}
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
    public async getAvailabilityOfPlacesOfInterest (input: BackendActorAvailabilityQuery): Promise<LocationAvailabilityDtos[]> {
        const ENDPOINT = '/getAvailabilityOfPlacesOfInterest';
        const ENV =  process.env.NODE_ENV;
        let airbnbLocationCalendarDtos: AirbnbLocationCalendarDto[];

        try {
            if (ENV === 'test') {
                console.log('this is the ' + process.env.NODE_ENV + ' environment');
                const airbnbCalendarAxiosResponse = await axios.get<AirbnbLocationCalendarDto[] | AirbnbLocationCalendarErrorDto[]>(getActorServerUrl() + ENDPOINT);
                if(airbnbCalendarAxiosResponse.status === 200)
                    airbnbLocationCalendarDtos = airbnbCalendarAxiosResponse.data as AirbnbLocationCalendarDto[];
            } else {
                console.log('this is the ' + process.env.NODE_ENV + ' environment');
                const apifyApiKey = this.configService.get<string>('APIFY_API_KEY');

                const apifyClient = new ApifyClient({
                    token: apifyApiKey
                });
                const runActor = await apifyClient.actor('ccJyNmz7QdWIahg10').call({
                    ids: input.ids,
                    bplaces: false
                });
                const {items: apifyClientAirbnbCalendarResponseArry} = await apifyClient.dataset(runActor.defaultDatasetId).listItems();
                airbnbLocationCalendarDtos = apifyClientAirbnbCalendarResponseArry as unknown as AirbnbLocationCalendarDto[];
            }
            const calendarMonths = airbnbLocationCalendarDtos[0].data.data.merlin.pdpAvailabilityCalendar.calendarMonths;

            return this.airbnbCalendarMapper
                .mapAirbnbLocationCalendarDtoToLocationAvailabilityDto(airbnbLocationCalendarDtos);
        } catch (error) {
            console.log(error);
            throw new HttpException('Error al ejecutar el actor', 500);
        }
    }
}
