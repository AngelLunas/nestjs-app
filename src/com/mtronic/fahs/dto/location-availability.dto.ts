
interface ILocationAvailabilityDto {
    id: string,
    proxSeisMeses: number,
    meses: IMonthDataDto[]
}

interface IMonthDataDto {
    año: number,
    mes: number,
    porcentajeDisponibilidad: number
}

export default ILocationAvailabilityDto;
