import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodaModule } from './coda/coda.module';
import { TrackingModule } from './tracking/tracking.module';
import { ActorModule } from './com/mtronic/fahs/service/actor.module';
import { FahsModule } from './com/mtronic/fahs/controller/fahs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './jobs/tasks.service';
import { JobService } from './jobs/jobs.service';
import { CodaService } from './coda/coda.service';
import { ActorService } from './com/mtronic/fahs/service/actor.service';
import { AirbnbCalendarMapper } from './com/mtronic/fahs/mapper/airbnb-calendar.mapper';
import { MongoModule } from './database/Mongo.module';
import { PlaceOfInterestAvailabilityController } from './database/availabilityOfPlaces/PlaceOfInterestAvailabilityModel.controller';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        MongoModule,
        CodaModule,
        TrackingModule,
        FahsModule,
        ActorModule,
        ScheduleModule.forRoot(),
        /*PlaceModule*/
    ],
    controllers: [AppController, PlaceOfInterestAvailabilityController],
    providers: [AppService, AirbnbCalendarMapper, CodaService, ActorService, JobService, TasksService],
})
export class AppModule {}
