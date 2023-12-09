import axios from 'axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { viewsId } from '../utils/constants';

@Injectable()
export class CodaService {
    constructor(private configService: ConfigService) {}
    public async getIdsPage(page: string): Promise<string[]> {
        const docId = this.configService.get<string>('CODA_DOC_ID'); //doc id de fahs,
        const tableId = viewsId[page]; // view id de la tabla de FAHS

        if (docId && tableId) {
            const codaApiKey = this.configService.get<string>('CODA_API_KEY'); // api key de fahs
            const headers: Record<string, string> = {
                Authorization: `Bearer ${codaApiKey}`,
            };
            try {
                const response = await axios.get(
                    `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/rows`,
                    {
                        headers,
                    },
                );
                //Para cada item, obtengo el id y lo agrego a un array
                const ids: string[] = response.data.items
                    .map((item: any) => {
                        const currentId = item.values['c-OCMBG1whUA'];
                        if (!currentId.includes('datosDePrueba')) {
                            return currentId;
                        }
                        return null;
                    })
                    .filter((id: string) => id != null);

                return ids;
            } catch (error) {
                console.error(error);
                throw new HttpException(
                    'Error al obtener los ids de la página',
                    500,
                );
            }
        } else {
            throw new HttpException('La página no existe', 404);
        }
    }
}
