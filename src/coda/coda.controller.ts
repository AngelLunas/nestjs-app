import { Controller, Get, Param } from "@nestjs/common";
import { CodaService } from "./coda.service";

@Controller("coda")
export class codaController {
    constructor (private readonly codaService: CodaService) {}
    
    @Get('getRowsByView/:view')
    async getRowsByView(@Param('view') view: string): Promise<any> {
        return await this.codaService.getPlacesDataByView(view);
    }

    @Get('getControlValueById/:id')
    async getControlValueById(@Param('id') id: string): Promise<any> {
        return await this.codaService.getControlValueById(id);
    }
}