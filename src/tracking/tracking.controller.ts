import { Controller, Get } from '@nestjs/common';
import { AvailabilityData } from '@mtronic-llc/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
    constructor(private readonly trackingService: TrackingService) {}
    @Get()
    getPlaces(): AvailabilityData[] {
        return this.trackingService.GetPlaces();
    }
}
