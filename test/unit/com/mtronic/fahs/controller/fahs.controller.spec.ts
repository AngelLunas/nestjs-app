import { Test, TestingModule } from "@nestjs/testing";
import { FahsController } from "../../../../../../src/com/mtronic/fahs/controller/fahs.controller";
import { ActorService } from "../../../../../../src/com/mtronic/fahs/service/actor.service";
import { CodaService } from "../../../../../../src/coda/coda.service";
import { HttpException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BackendActorPlacesQuery } from "@mtronic-llc/common";
import * as dotenv from 'dotenv';
import {WireMock} from "wiremock-captain";
import * as airbnbLocationCalendarDto200RespSAMPLE from "../../../../../resources/actor/airbnbLocationCalendar.dto-200-resp-SAMPLE.json";
import * as airbnbStaySearchDto200RespSAMPLE from "../../../../../resources/actor/airbnbStaySearch.dto-200-resp-SAMPLE.json";
import * as airbnbStaySearchDto400RespSAMPLE from "../../../../../resources/actor/airbnbStaySearch.dto-400-resp-SAMPLE.json";
import { getActorServerUrl } from "../../../../../../src/utils/utils";
import {AirbnbCalendarMapper} from "../../../../../../src/com/mtronic/fahs/mapper/airbnb-calendar.mapper";
import { AirbnbStaySearchMapper } from "../../../../../../src/com/mtronic/fahs/mapper/airbnb-stay-search.mapper";


describe('FahsController (unit)', () => {
    let controller: FahsController;
    let actorService: ActorService;
    let codaService: CodaService;
    let configService: ConfigService

    const wiremockUrl = getActorServerUrl();
    const wireMockServer = new WireMock(wiremockUrl);
    const ENDPOINT = '/getAvailabilityOfPlacesOfInterest';

    beforeEach(async () => {
        dotenv.config();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [FahsController],
            providers: [ActorService, CodaService, ConfigService, AirbnbCalendarMapper, AirbnbStaySearchMapper],
        }).compile();

        controller = module.get<FahsController>(FahsController);
        actorService = module.get<ActorService>(ActorService);
        codaService = module.get<CodaService>(CodaService);
    });

    //Para limpiar los registros de wiremock después de cada test
    /*afterEach(async () => {
        await wireMockServer.clearAll();
    });*/

    it('should be defined', () => {
        expect(controller).toBeDefined();
        console.log(airbnbLocationCalendarDto200RespSAMPLE, 'airbnbLocationCalendarDto200RespSAMPLE')
    });

    it('GET /getAvailabilityOfPlacesOfInterest - should return availability of locations', async () => {
        await wireMockServer.register(
            {endpoint: ENDPOINT, method: 'GET'},
            {
                status: 200,
                body: airbnbLocationCalendarDto200RespSAMPLE
            },
        );

        //TODO: Cambiar llamar endpoint con axios
        const locationAvailabilityDtos = await controller.getAvailabilityOfPlacesOfInterest();
        //TODO: Derek - verfificar que todo los properties de locationAvailabilityDtos sean llenados
        expect(locationAvailabilityDtos).toBeDefined();
        expect(locationAvailabilityDtos).toBeInstanceOf(Array);
        expect(locationAvailabilityDtos.length).toBeGreaterThan(0);
        console.log(JSON.stringify(locationAvailabilityDtos, null, 2), 'getAvailabilityOfPlacesOfInterest');
    }, 200000); // 200 seconds

    //Desactivada temporalmente mientras se separa la llamada para obtener los ids a coda para producción
    /*it('should runAvailability with 0 items', async () => {
        const error = new HttpException(
            'No existen datos que cumplan con los filtros',
            404,
        );
        jest.spyOn(actorService, 'getAvailabilityOfPlacesOfInterest').mockRejectedValue(error);
        await expect(controller.getAvailabilityOfPlacesOfInterest()).rejects.toEqual(error);
    }, 100000); //100 seconds*/

    it('should runAvailability with 0 items in apify actor', async () => {
        jest.spyOn(actorService, 'getAvailabilityOfPlacesOfInterest').mockResolvedValue([]);
        const result = await controller.getAvailabilityOfPlacesOfInterest();
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
    }, 100000); //100 seconds

    it('should throw an error if the airbnb request fails', async () => {
        await wireMockServer.register(
            {endpoint: '/getAvailablePlacesFromRegions', method: 'GET'},
            {
                status: 400,
                body: airbnbStaySearchDto400RespSAMPLE
            },
        ); 

        const today = new Date();
        const checkin = new Date(); //fecha de mañana
        checkin.setDate(today.getDate() + 1);
        const checkout = new Date(checkin); //fecha 6 días después de mañana
        checkout.setDate(checkin.getDate() + 6);

        const body = {
            checkin: checkin.toISOString().split('T')[0],
            checkout: checkout.toISOString().split('T')[0],
            regions: ['Miami']
        };

        try {
            await controller.getAvailablePlacesFromRegions(body);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
        }
    });

    it('GET /getAvailablePlacesFromRegions - should return available places of interest', async () => {
        await wireMockServer.register(
            {endpoint: '/getAvailablePlacesFromRegions', method: 'GET'},
            {
                status: 200,
                body: airbnbStaySearchDto200RespSAMPLE
            },
        );
        
        const today = new Date();
        const checkin = new Date(); //fecha de mañana
        checkin.setDate(today.getDate() + 1);
        const checkout = new Date(checkin); //fecha 6 días después de mañana
        checkout.setDate(checkin.getDate() + 6);

        const body = {
            checkin: checkin.toISOString().split('T')[0],
            checkout: checkout.toISOString().split('T')[0],
            regions: ['Miami']
        };

        const placesOfInterestAvailabilityDtos = await controller.getAvailablePlacesFromRegions(body);
        //TODO: Derek - verfificar que todo los properties de placesOfInterestAvailabilityDtos sean llenados
        expect(placesOfInterestAvailabilityDtos).toBeDefined();
        expect(placesOfInterestAvailabilityDtos).toBeInstanceOf(Array);
        expect(placesOfInterestAvailabilityDtos.length).toBeGreaterThan(0);
        console.log(JSON.stringify(placesOfInterestAvailabilityDtos, null, 2), 'getAvailablePlacesFromRegions');
    }, 200000); // 200 seconds

    it('should runPlaces with inexistent dates', async () => {
        const error = new HttpException('Alguna de las fechas no existe', 400);
        const result = controller.getAvailablePlacesFromRegions({ checkin: '2024-13-02', checkout: '2024-13-12', regions: ['Miami'] });
        await expect(result).rejects.toEqual(error);
    });

    it('should runPlaces with invalid date format', async () => {
        const error = new HttpException('Formato de fecha inválido (YYYY-MM-DD)', 400);
        const result = controller.getAvailablePlacesFromRegions({ checkin: '2024/12-13', checkout: '2024/12/11', regions: ['Miami'] });
        await expect(result).rejects.toEqual(error);
    });
});
