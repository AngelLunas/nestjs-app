import { HttpException, Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {ApifyClient} from "apify-client";
import { LocationsByRegion } from "@mtronic-llc/fahs-common-test";
import { LocationAvailabilityDtos, LocationAvailabilityDtosResponse } from "@mtronic-llc/fahs-common-test";
import { BackendActorAvailabilityQuery, BackendActorPlacesQuery } from "@mtronic-llc/fahs-common";
import axios from "axios";
import {AirbnbLocationCalendarErrorDto} from "../dto/actor/airbnb-location-calendar.dto-ERROR";
import {AirbnbLocationCalendarDto} from "../dto/actor/airbnb-location-calendar.dto";
import {AirbnbStaySearchDto} from "../dto/actor/airbnb-stay-search.dto";
import {getActorServerUrl} from "../../../../utils/utils";
import {AirbnbCalendarMapper} from "../mapper/airbnb-calendar.mapper";
import {AirbnbStaySearchMapper} from "../mapper/airbnb-stay-search.mapper";

@Injectable()
export class ActorService {
    constructor (private configService: ConfigService, private airbnbCalendarMapper: AirbnbCalendarMapper, private airbnbStaySearchMapper: AirbnbStaySearchMapper) {}
    public async getAvailablePlacesFromRegions (input: BackendActorPlacesQuery): Promise<LocationsByRegion[]> {
        let airbnbStaySearchDto: AirbnbStaySearchDto[];
        const ENDPOINT = '/getAvailablePlacesFromRegions';
        const ENV =  process.env.NODE_ENV;

        try {
            console.log('this is the ' + ENV + ' environment');
            if (ENV === 'test') {
                const airbnbStaySearchAxiosResponse = await axios.get<AirbnbStaySearchDto[]>(getActorServerUrl() + ENDPOINT);
                if (airbnbStaySearchAxiosResponse.status === 200)
                    airbnbStaySearchDto = airbnbStaySearchAxiosResponse.data as AirbnbStaySearchDto[];
            } else {
                const apifyApiKey = this.configService.get<string>('APIFY_API_KEY');
                const apifyClient = new ApifyClient({token: apifyApiKey});
                const runActor = await apifyClient.actor('ccJyNmz7QdWIahg10').call({
                    ids: ['00000'],
                    bplaces: true,
                    regions: input.regions,
                    checkin: input.checkin,
                    checkout: input.checkout
                });

                const { items: apifyClientAirbnbStaySearchResponseArry } = await apifyClient.dataset(runActor.defaultDatasetId).listItems();
                airbnbStaySearchDto = apifyClientAirbnbStaySearchResponseArry as unknown as AirbnbStaySearchDto[];
            }
            
            return this.airbnbStaySearchMapper.mapAirbnbStaySearchDtoToPlaceOfInterestAvailabilityDto(airbnbStaySearchDto);
        } catch (error) {
            console.error(error);
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Error al ejecutar el actor', 500);
            }
        }
    }
   //TODO: Derek - cambiar el retorno de este metodo de any a objecto de JSON que viene de Airbnb
    public async getAvailabilityOfPlacesOfInterest (input: BackendActorAvailabilityQuery): Promise<LocationAvailabilityDtosResponse[]> {
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
            //const calendarMonths = airbnbLocationCalendarDtos[0].data.data.merlin.pdpAvailabilityCalendar.calendarMonths;

            return this.airbnbCalendarMapper
                .mapAirbnbLocationCalendarDtoToLocationAvailabilityDto(airbnbLocationCalendarDtos);
        } catch (error) {
            console.error(error);
            throw new HttpException('Error al ejecutar el actor', 500);
        }
    }
}
