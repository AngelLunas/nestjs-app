import { Module } from '@nestjs/common';
import { CodaService } from './coda.service';
import { codaController } from './coda.controller';

@Module({
    providers: [CodaService],
    controllers: [codaController],
})
export class CodaModule {}
