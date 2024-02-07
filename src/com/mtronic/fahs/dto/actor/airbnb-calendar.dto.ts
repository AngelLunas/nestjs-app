export interface AirbnbCalendarDto {
    data:       Data;
    extensions: Extensions;
}

export interface Data {
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
    __typename:      string;
    month:           number;
    year:            number;
    days:            Day[];
    conditionRanges: ConditionRange[];
    listingId:       string;
}

export interface ConditionRange {
    __typename: ConditionRangeTypename;
    conditions: Conditions;
    startDate:  Date;
    endDate:    Date;
}

export enum ConditionRangeTypename {
    MerlinCalendarConditionRange = "MerlinCalendarConditionRange",
}

export interface Conditions {
    __typename:        ConditionsTypename;
    closedToArrival:   boolean;
    closedToDeparture: boolean;
    endDayOfWeek:      null;
    maxNights:         number;
    minNights:         number;
}

export enum ConditionsTypename {
    MerlinCalendarConditions = "MerlinCalendarConditions",
}

export interface Day {
    __typename:           DayTypename;
    calendarDate:         Date;
    available:            boolean;
    maxNights:            number;
    minNights:            number;
    availableForCheckin:  boolean;
    availableForCheckout: boolean;
    bookable:             boolean;
    price:                Price;
}

export enum DayTypename {
    MerlinCalendarDay = "MerlinCalendarDay",
}

export interface Price {
    __typename:          PriceTypename;
    localPriceFormatted: null;
}

export enum PriceTypename {
    MerlinCalendarDayPrice = "MerlinCalendarDayPrice",
}

export interface Metadata {
    __typename:                              string;
    constantMinNights:                       number;
    onlyShowAvailableForCheckinOnDatepicker: boolean;
}

export interface Extensions {
    traceId: string;
}
