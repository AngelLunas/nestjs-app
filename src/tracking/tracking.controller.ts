import { Controller, Get } from '@nestjs/common';
import { LocationAvailabilityDtos } from '@mtronic-llc/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
    constructor(private readonly trackingService: TrackingService) {}
    @Get()
    getPlaces(): LocationAvailabilityDtos[] {
        return this.trackingService.GetPlaces();
    }
}
