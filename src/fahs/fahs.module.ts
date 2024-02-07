import { Module } from "@nestjs/common";
import { FahsController } from "./fahs.controller";
import { CodaModule } from "src/coda/coda.module";
import { ActorModule } from "../com/service/actor.module";
import { ActorService } from "../com/service/actor.service";
import { CodaService } from "src/coda/coda.service";

@Module({
    imports: [CodaModule, ActorModule],
    controllers: [FahsController],
    providers: [CodaService, ActorService]
})
export class FahsModule {}
