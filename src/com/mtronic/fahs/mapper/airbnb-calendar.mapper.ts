import {AirbnbLocationCalendarDto} from "../dto/actor/airbnb-location-calendar.dto";
import { Injectable } from "@nestjs/common";
import {LocationAvailabilityDtos, MonthData, LocationAvailabilityDtosResponse, Error} from '@mtronic-llc/fahs-common-test';

@Injectable()
export class AirbnbCalendarMapper {
    mapAirbnbLocationCalendarDtoToLocationAvailabilityDto(
        //TODO: Derek - cambiar nombre de AvailabilityData a LocationAvailabilityDto & MonthData a MonthDataDto
        airbnbLocationCalendarDtos: AirbnbLocationCalendarDto[]): LocationAvailabilityDtosResponse[] {
        let locationAvailabilityDtos: LocationAvailabilityDtosResponse[] = [];
        airbnbLocationCalendarDtos.map(airbnbLocationCalendarDto => {
            try {
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
                
                locationAvailabilityDtos.push(new LocationAvailabilityDtosResponse(
                    {
                        kind: 'LocationAvailabilityDtos',
                        id: airbnbLocationCalendarDto.id,
                        proxSeisMeses: percentAvailForNext6Months,
                        meses: monthDataDtos
                    }
                ));
            } catch (e) {
                locationAvailabilityDtos.push(new LocationAvailabilityDtosResponse(
                    new Error('Es posible que este dato ya no exista', airbnbLocationCalendarDto.id)
                ));
            }
        });
        return locationAvailabilityDtos;
    }
}
