import { Module } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { CodaModule } from "../../../../coda/coda.module";
import { CodaService } from "../../../../coda/coda.service";

@Module({
    imports: [CodaModule],
    providers: [ActorService, CodaService],
})
export class ActorModule {}
