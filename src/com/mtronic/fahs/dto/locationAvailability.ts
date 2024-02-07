import IMonthData from "./monthIf"

interface ILocationAvailability {
    id: string,
    proxSeisMeses: number,
    meses: IMonthData[]
}

export default ILocationAvailability;
