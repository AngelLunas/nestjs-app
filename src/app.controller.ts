import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MonthData } from '@mtronic-llc/common';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): MonthData {
        return this.appService.getHello();
    }
}
