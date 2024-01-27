import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodaModule } from './coda/coda.module';
import { TrackingModule } from './tracking/tracking.module';
import { ActorModule } from './actor/actor.module';
import { PlaceModule } from './place/place.module';
import { FahsModule } from './fahs/fahs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        CodaModule,
        TrackingModule,
        FahsModule,
        ActorModule,
        PlaceModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
