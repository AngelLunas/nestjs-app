import IMonthData from "./monthIf.js"

interface ILocationAvailability {
    id: string,
    proxSeisMeses: number,
    meses: IMonthData[]
}

export default ILocationAvailability;
