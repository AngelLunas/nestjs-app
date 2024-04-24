import * as dotenv from 'dotenv';
import * as airbnbStaySearchDto200RespSAMPLE from "../../../../../resources/actor/airbnbStaySearch.dto-200-resp-SAMPLE.json";
import { Test, TestingModule } from "@nestjs/testing";
import { ActorService } from "../../../../../../src/com/mtronic/fahs/service/actor.service";
import { ConfigService } from "@nestjs/config";
import { BackendActorPlacesQuery } from '@mtronic-llc/common';
import { AirbnbCalendarMapper } from '../../../../../../src/com/mtronic/fahs/mapper/airbnb-calendar.mapper';
import { AirbnbStaySearchMapper } from '../../../../../../src/com/mtronic/fahs/mapper/airbnb-stay-search.mapper';
import { getActorServerUrl } from "../../../../../../src/utils/utils";
import { WireMock } from "wiremock-captain";

describe('ActorService', () => {
    let service: ActorService;
    let configService: ConfigService;
    const wiremockUrl = getActorServerUrl();
    const wireMockServer = new WireMock(wiremockUrl);

    beforeEach(async () => {
        dotenv.config();

        const module: TestingModule = await Test.createTestingModule({
            providers: [ActorService, ConfigService, AirbnbCalendarMapper, AirbnbStaySearchMapper],
        }).compile();

        service = module.get<ActorService>(ActorService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    /*it('should runActorPlacesQuery', async () => {
        await wireMockServer.register(
            {endpoint: '/getAvailablePlacesFromRegions', method: 'GET'},
            {
                status: 200,
                body: airbnbStaySearchDto200RespSAMPLE
            },
        );
        //Fechas de prueba
        const today = new Date();
        const checkin = new Date(); //fecha de mañana
        checkin.setDate(today.getDate() + 1);
        const checkout = new Date(checkin); //fecha 6 días después de mañana
        checkout.setDate(checkin.getDate() + 6);

        const input: BackendActorPlacesQuery = {
            regions: ['Miami'],
            checkin: checkin.toISOString().split('T')[0],
            checkout: checkout.toISOString().split('T')[0]
        };

        const result = await service.getAvailablePlacesFromRegions(input);
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    }, 30000);

    it('should runActorAvailabilityQuery', async () => {
        const input = {ids: ['590797477916353205']};
        const result = await service.getAvailabilityOfPlacesOfInterest(input);
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    }, 30000);*/
});
