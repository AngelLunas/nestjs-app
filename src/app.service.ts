import { Injectable } from '@nestjs/common';
import { MonthData } from '../../common/common';

@Injectable()
export class AppService {
    getHello(): MonthData {
        return new MonthData(2023, 12, 98);
    }
}
