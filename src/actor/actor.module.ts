import { Module } from "@nestjs/common";
import { ActorController } from "./actor.controller";
import { ActorService } from "./actor.service";
import { CodaModule } from "../coda/coda.module";
import { CodaService } from "src/coda/coda.service";

@Module({
    imports: [CodaModule], 
    controllers: [ActorController],
    providers: [ActorService, CodaService],
})
export class ActorModule {}