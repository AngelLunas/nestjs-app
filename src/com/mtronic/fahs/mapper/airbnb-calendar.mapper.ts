import {AirbnbLocationCalendarDto} from "../dto/actor/airbnb-location-calendar.dto";
import { Injectable } from "@nestjs/common";
import {LocationAvailabilityDtos, MonthData, LocationAvailabilityDtosResponse, Error, Fecha} from '@mtronic-llc/fahs-common-test';

@Injectable()
export class AirbnbCalendarMapper {
    mapAirbnbLocationCalendarDtoToLocationAvailabilityDto(
        //TODO: Derek - cambiar nombre de AvailabilityData a LocationAvailabilityDto & MonthData a MonthDataDto
        airbnbLocationCalendarDtos: AirbnbLocationCalendarDto[]): LocationAvailabilityDtosResponse[] {
        let locationAvailabilityDtos: LocationAvailabilityDtosResponse[] = [];
        const days = ['L', 'M', 'm', 'J', 'V', 'S', 'D'];

        airbnbLocationCalendarDtos.map(airbnbLocationCalendarDto => {
            try {
                const monthDataDtos: MonthData[] = airbnbLocationCalendarDto.data.data.merlin.pdpAvailabilityCalendar.calendarMonths.map(
                    calendarMonth => {
                        const numberOfDaysInMonth = calendarMonth.days.length;
                        let availableDays = 0;
                        const dates: Fecha[] = [];
                        calendarMonth.days.map(day => {
                            const date = new Date(day.calendarDate);  
                            const weekDay = date.getDay() + 1;
                            dates.push(new Fecha(day.calendarDate, day.available, weekDay.toString(), day.availableForCheckin));
                            if (day.availableForCheckin) {
                                availableDays++;
                            }
                        });
                        const percentAvailable = (availableDays / numberOfDaysInMonth) * 100;
                        const monthDataDto: MonthData =  {
                            año: calendarMonth.year,
                            mes: calendarMonth.month,
                            porcentajeDisponibilidad: percentAvailable,
                            fechas: dates
                        };
                        return monthDataDto
                    });
                const percentAvailForNext6Months = monthDataDtos.slice(0, 6)
                    .reduce(
                        (
                            percentAvailableForMonth,
                            monthDataDto
                        ) => percentAvailableForMonth + monthDataDto.porcentajeDisponibilidad, 0) / 6;
                
                locationAvailabilityDtos.push(new LocationAvailabilityDtosResponse(
                    {
                        kind: 'LocationAvailabilityDtos',
                        id: airbnbLocationCalendarDto.id,
                        proxSeisMeses: percentAvailForNext6Months,
                        host: '',
                        meses: monthDataDtos
                    }
                ));
            } catch (e) {
                console.log(e);
                locationAvailabilityDtos.push(new LocationAvailabilityDtosResponse(
                    new Error('Es posible que este dato ya no exista', airbnbLocationCalendarDto.id, '')
                ));
            }
        });
        return locationAvailabilityDtos;
    }
}
