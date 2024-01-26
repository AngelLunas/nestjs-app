import axios from 'axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { viewsId } from '../utils/constants';
import * as filters from './coda.filters.json';

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
            let ids: string[] = [];

            try {
                const response = await axios.get(
                    `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/rows`,
                    {
                        headers,
                    },
                );
                //Para cada item, obtengo el id y lo agrego a un array
                ids = response.data.items
                    .map((item: any) => {
                        let currentId = item.values['c-OCMBG1whUA'];
                        if (!currentId.includes('datosDePrueba')) {
                            //Aplico filtros solamente para la página central que contiene todos los datos
                            if (page === 'central') {
                                //convierto el precio a number
                                let numberPrice = Number(item.values['c-P1PHzAXpXt'].replace(/[^0-9.-]+/g,""));
                                item.values['c-P1PHzAXpXt'] = numberPrice;
                                //Aplico los filtros de coda.filters.json a cada item
                                Object.entries(filters).forEach(([key, value]) => {
                                    if (value.type === 'max') {
                                        if (item.values[key] > value.value) {
                                            currentId = null;
                                        }
                                    } else if (value.type === 'min') {
                                        if (item.values[key] < value.value) {
                                            currentId = null;
                                        }
                                    } else if (value.type === 'list') {
                                        if (Array.isArray(value.value)) {
                                            if (!value.value.includes(item.values[key])) {
                                                currentId = null;
                                            }
                                        }
                                    }
                                });
                           }
                            return currentId;
                        }
                        return null;
                    }).filter((id: string) => id != null);

            } catch (error) {
                console.error(error);
                throw new HttpException(
                    'Error al obtener los ids de la página',
                    500,
                );
            }

            if (ids.length > 0) {
                return ids;
            } else {
                throw new HttpException(
                    'No existen datos que cumplan con los filtros',
                    404,
                );
            }

        } else {
            throw new HttpException('La página no existe', 404);
        }
    }
}
