import { Test, TestingModule } from '@nestjs/testing';
import { CodaController } from './coda.controller';

describe('CodaController', () => {
  let controller: CodaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodaController],
    }).compile();

    controller = module.get<CodaController>(CodaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
