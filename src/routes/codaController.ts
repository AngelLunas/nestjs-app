import express, {Request, Response, Router} from 'express';

const docId = 'pOv7VpPKDY';

const pagesIds: { [key: string]: string } = { 
    "datosiniciales": "table-rUQc0hjCXq",
    "premensajeando": "table-aVulzHF5-f",
    "descripcionyfotos": "table-2PNjgCe5Hi",
    "mensajeria": "table-nVgkGMib2a",
    "seleccionarlasreservas": "table-aqigJZRUVH",
    "interesenreservar": "table-WtLQtJlwyt"
};

const codaController: Router = express.Router();

codaController.get("/ids/:page", async (req: Request, res: Response) => {
    const page: string = req.params.page;
    const tableId: string = pagesIds[page];
    if (tableId) {
        const codaApiKey = process.env.CODA_API_KEY;
        const headers = {
            'Authorization': `Bearer ${codaApiKey}`
        };

        try {
            const response = await fetch(`https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/rows`, {headers});
            const data = await response.json();
            const ids = data.items.map((item: any) => {
                const currentId = item.values['c-OCMBG1whUA'];
                if (!currentId.includes("datosDePrueba")) {
                    return currentId;
                }
                return null;
            }).filter((id: string) => id != null);

            res.status(200);
            res.json({items: ids});
        } catch {
            res.status(500);
            res.json({error: "Hubo un error interno en la solicitud"});
        }
    } else {
        res.status(404);
        res.json({error: "No existe la página"});
    }
});

export default codaController;