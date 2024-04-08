import {AirbnbLocationCalendarDto} from "../dto/actor/airbnb-location-calendar.dto";
import {Injectable} from "@nestjs/common";
import {LocationAvailabilityDtos, MonthData} from '@mtronic-llc/common';



@Injectable()
export class AirbnbCalendarMapper {
    mapAirbnbLocationCalendarDtoToLocationAvailabilityDto(
        //TODO: Derek - cambiar nombre de AvailabilityData a LocationAvailabilityDto & MonthData a MonthDataDto
        airbnbLocationCalendarDtos: AirbnbLocationCalendarDto[]): LocationAvailabilityDtos[] {
        let locationAvailabilityDtos: LocationAvailabilityDtos[] = [];
        airbnbLocationCalendarDtos.map(airbnbLocationCalendarDto => {
            const monthDataDtos: MonthData[] = airbnbLocationCalendarDto.data.data.merlin.pdpAvailabilityCalendar.calendarMonths.map(
                calendarMonth => {
                    const numberOfDaysInMonth = calendarMonth.days.length;
                    const availableDays = calendarMonth.days.filter(day => day.available).length;
                    const percentAvailable = (availableDays / numberOfDaysInMonth) * 100;
                    const monthDataDto: MonthData =  {
                        año: calendarMonth.year,
                        mes: calendarMonth.month,
                        porcentajeDisponibilidad: percentAvailable
                    };
                    return monthDataDto
                });
            const percentAvailForNext6Months = monthDataDtos.slice(0, 6)
                .reduce(
                    (
                        percentAvailableForMonth,
                        monthDataDto
                    ) => percentAvailableForMonth + monthDataDto.porcentajeDisponibilidad, 0) / 6;

            locationAvailabilityDtos.push({
                kind: null,
                id: airbnbLocationCalendarDto.id,
                proxSeisMeses: percentAvailForNext6Months,
                meses: monthDataDtos});
        });
        return locationAvailabilityDtos;
    }
}
