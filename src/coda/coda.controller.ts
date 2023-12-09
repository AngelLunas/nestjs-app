import {
    Controller,
    Get,
    Param,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { CodaService } from './coda.service';
@Controller('coda')
export class CodaController {
    constructor(private readonly codaService: CodaService) {}
    @Get('ids/:page')
    async getIds(@Param('page') page: string): Promise<string[]> {
        try {
            const ids: string[] = await this.codaService.getIdsPage(page);
            return ids;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    'Error al obtener los ids de la página',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
}
