import { Test, TestingModule } from "@nestjs/testing";
import { FahsController } from "./fahs.controller";
import { ActorService } from "../service/actor.service";
import { CodaService } from "../../../../coda/coda.service";
import { HttpException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BackendActorPlacesQuery } from "@mtronic-llc/common";
import * as dotenv from 'dotenv';
import {WireMock} from "wiremock-captain";
import * as airbnbLocationCalendarDto200RespSAMPLE from "../../../../../test/resources/actor/airbnbLocationCalendar.dto-200-resp-SAMPLE.json";
import { getActorServerUrl } from "../../../../utils/utils";
import {AirbnbCalendarMapper} from "../mapper/airbnb-calendar.mapper";


describe('FahsController (e2e)', () => {
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
            providers: [ActorService, CodaService, ConfigService, AirbnbCalendarMapper],
        }).compile();

        controller = module.get<FahsController>(FahsController);
        actorService = module.get<ActorService>(ActorService);
        codaService = module.get<CodaService>(CodaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
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
        console.log(JSON.stringify(locationAvailabilityDtos, null, 2));
    }, 200000); // 200 seconds

    it('should runAvailability with 0 items', async () => {
        const error = new HttpException(
            'No existen datos que cumplan con los filtros',
            404,
        );
        jest.spyOn(codaService, 'getIdsOfPlacesWithLittleInterestOrMore').mockRejectedValue(error);
        await expect(controller.getAvailabilityOfPlacesOfInterest()).rejects.toEqual(error);
    }, 100000); //100 seconds

    it('should runAvailability with 0 items in apify actor', async () => {
        jest.spyOn(actorService, 'getAvailabilityOfPlacesOfInterest').mockResolvedValue([]);
        const result = await controller.getAvailabilityOfPlacesOfInterest();
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
    }, 100000); //100 seconds

    it('should runPlaces', async () => {
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

        const result = await controller.getAvailablePlacesFromRegions(body);
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    }, 100000); // 100 seconds

    it('should runPlaces with empty body', async () => {
        const mockBody = {};

        jest.spyOn(actorService, 'getAvailablePlacesFromRegions').mockImplementation(() => Promise.resolve({}));

        try {
            const result = await controller.getAvailablePlacesFromRegions(mockBody as BackendActorPlacesQuery);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toEqual(400);
        }
    });

    it('should runPlaces with inexistent region', async () => {
        try {
            const result = await controller.getAvailablePlacesFromRegions({ checkin: '2021-01-01', checkout: '2021-01-07', regions: ['nulls'] });
        } catch (error) {
            //Debo de lanzar el error de región inexistente desde el actor de Apify
            expect(error).toBeInstanceOf(HttpException);
        }
    }, 100000);

    it('should runPlaces with no regions', async () => {
        const error = new HttpException('No se especificaron regiones', 400);
        const result = controller.getAvailablePlacesFromRegions({ checkin: '2021-01-01', checkout: '2021-01-07', regions: [] });
        await expect(result).rejects.toEqual(error);
    });

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
