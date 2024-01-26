import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaceSchema } from "./place.schema";
import { PlaceService } from "./place.service";
import { PlaceController } from "./place.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }])],
    providers: [PlaceService],
    controllers: [PlaceController]
})
export class PlaceModule {}