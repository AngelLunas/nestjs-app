import { Module } from '@nestjs/common';
import { CodaService } from './coda.service';

@Module({
    providers: [CodaService],
})
export class CodaModule {}
