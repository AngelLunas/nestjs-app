export interface AirbnbLocationCalendarDto {
    id:   string;
    data: AirbnbLocationCalendarData;
}

export interface AirbnbLocationCalendarData {
    data:       DataData;
    extensions: Extensions;
}

export interface DataData {
    merlin: Merlin;
}

export interface Merlin {
    __typename:              string;
    pdpAvailabilityCalendar: PDPAvailabilityCalendar;
}

export interface PDPAvailabilityCalendar {
    __typename:     string;
    calendarMonths: CalendarMonth[];
    metadata:       Metadata;
}

export interface CalendarMonth {
    __typename: string;
    month:      number;
    year:       number;
    days:       Day[];
    listingId:  string;
}

export interface Day {
    __typename:            string;
    calendarDate?:         Date;
    available?:            boolean;
    maxNights?:            number;
    minNights?:            number;
    availableForCheckin?:  boolean;
    availableForCheckout?: boolean;
    bookable?:             null;
    price?:                Price;
    conditions?:           Conditions;
    startDate?:            Date;
    endDate?:              Date;
}

export interface Conditions {
    __typename:        string;
    closedToArrival:   boolean;
    closedToDeparture: boolean;
    endDayOfWeek:      null;
    maxNights:         number;
    minNights:         number;
}

export interface Price {
    __typename:          string;
    localPriceFormatted: null;
}

export interface Metadata {
    __typename:                              string;
    constantMinNights:                       null;
    onlyShowAvailableForCheckinOnDatepicker: boolean;
}

export interface Extensions {
    traceId: string;
}
