import { Module } from "@nestjs/common";
import { FahsController } from "./fahs.controller";
import { CodaModule } from "../../../../coda/coda.module";
import { ActorModule } from "../service/actor.module";
import { ActorService } from "../service/actor.service";
import { CodaService } from "../../../../coda/coda.service";
import {AirbnbCalendarMapper} from "../mapper/airbnb-calendar.mapper";

@Module({
    imports: [CodaModule, ActorModule],
    controllers: [FahsController],
    providers: [CodaService, ActorService, AirbnbCalendarMapper]
})
export class FahsModule {}
