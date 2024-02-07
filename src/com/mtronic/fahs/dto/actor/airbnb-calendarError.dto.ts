export interface AirbnbCalendarErrorDto {
    errors: Error[];
    data:   null;
}

export interface Error {
    message:    string;
    locations:  Location[];
    path:       any[];
    extensions: Extensions;
}

export interface Extensions {
    response: Response;
    code:     string;
}

export interface Response {
    statusCode: number;
    body:       Body;
}

export interface Body {
    error_code:    number;
    error_type:    string;
    error_message: string;
}

export interface Location {
    line:   number;
    column: number;
}
