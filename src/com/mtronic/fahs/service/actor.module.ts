import { Module } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { CodaModule } from "../../../../coda/coda.module";
import { CodaService } from "../../../../coda/coda.service";
import {AirbnbCalendarMapper} from "../mapper/airbnb-calendar.mapper";
import {AirbnbStaySearchMapper} from "../mapper/airbnb-stay-search.mapper";

@Module({
    imports: [CodaModule],
    providers: [ActorService, CodaService, AirbnbCalendarMapper, AirbnbStaySearchMapper],
})
export class ActorModule {}
