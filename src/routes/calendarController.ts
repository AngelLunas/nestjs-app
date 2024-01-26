import express, {Request, Response, Router} from 'express';
import { availabilityPlace } from './hooks.js';

const calendarController: Router = express.Router();

calendarController.get("/:id/:month?/:year?/:original?", async (req: Request, res: Response) => {
    const today = new Date();
    const id: string = req.params.id;
    const original: boolean = req.params.original == 'original';
    //si no se provee un mes en URL se usa el mes actual para la consulta
    const month: number = req.params.month ? parseInt(req.params.month) : today.getMonth() + 1;
    //si no se provee un año en URL se usa el año actual para la consulta
    const year: number = req.params.year ? parseInt(req.params.year) : today.getFullYear();
    const dataPlace = await availabilityPlace(id, month, year, original);
    res.json(dataPlace);
});

export default calendarController;
