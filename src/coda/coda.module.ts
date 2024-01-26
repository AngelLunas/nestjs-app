import { Module } from '@nestjs/common';
import { CodaController } from './coda.controller';
import { CodaService } from './coda.service';

@Module({
    controllers: [CodaController],
    providers: [CodaService],
})
export class CodaModule {}
