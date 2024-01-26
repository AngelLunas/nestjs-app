import { Test, TestingModule } from '@nestjs/testing';
import { CodaService } from './coda.service';

describe('CodaService', () => {
    let service: CodaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CodaService],
        }).compile();

        service = module.get<CodaService>(CodaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
