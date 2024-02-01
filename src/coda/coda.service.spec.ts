import * as dotenv from 'dotenv';  
import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CodaService } from './coda.service';
import { ConfigService } from '@nestjs/config';

describe('CodaService', () => {
    let service: CodaService;
    let configService: ConfigService;
    
    beforeEach(async () => {
        dotenv.config();

        const module: TestingModule = await Test.createTestingModule({
            providers: [CodaService, ConfigService],
        }).compile();

        service = module.get<CodaService>(CodaService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should run getIdsPage without filters', async () => {
        const result = await service.getIdsPage('datosiniciales');
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    }, 15000);

    it('should run getIdsPage with filters', async () => {
        const result = await service.getIdsPage('central');
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    }, 15000);

    it('should run getIdsPage with invalid page', async () => {
        try {
            const result = await service.getIdsPage('invalid');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('La página no existe');
        }
    });

    it('should throw an error if no data matches the filters', async () => {
        // Spy on axios.get and mock its implementation
        const getSpy = jest.spyOn(axios, 'get');
        getSpy.mockResolvedValue({ data: { items: [] } });

        try {
            const result = await service.getIdsPage('central');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('No existen datos que cumplan con los filtros');
        }

        getSpy.mockRestore();
      });

});
