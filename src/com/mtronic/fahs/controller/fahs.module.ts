import { Module } from "@nestjs/common";
import { FahsController } from "./fahs.controller";
import { CodaModule } from "../../../../coda/coda.module";
import { ActorModule } from "../service/actor.module";
import { ActorService } from "../service/actor.service";
import { CodaService } from "../../../../coda/coda.service";
import {AirbnbCalendarMapper} from "../mapper/airbnb-calendar.mapper";
import { MongoDatabaseModule } from "../../../../database/MongoDatabase.module";
import { FahsService } from "../service/fahs.service";
//import {AirbnbStaySearchMapper} from "../mapper/airbnb-stay-search.mapper";

@Module({
    imports: [MongoDatabaseModule, CodaModule, ActorModule],
    providers: [CodaService, ActorService, AirbnbCalendarMapper, FahsService  /*AirbnbStaySearchMapper*/],
    controllers: [FahsController]
})
export class FahsModule {}
