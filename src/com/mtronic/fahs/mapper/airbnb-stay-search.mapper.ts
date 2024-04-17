import {AirbnbStaySearchDto} from "../dto/actor/airbnb-stay-search.dto";
import {HttpException, Injectable} from "@nestjs/common";
import {PlaceOfInterestAvailabilityDtos, StaySearchAvailibilityByCityDtos} from "@mtronic-llc/common-test";

@Injectable()
export class AirbnbStaySearchMapper {
    mapAirbnbStaySearchDtoToPlaceOfInterestAvailabilityDto(
        airbnbStaySearchDtos: AirbnbStaySearchDto[]): StaySearchAvailibilityByCityDtos[] {
        let staysSearchAvailibilityByCityDtos: StaySearchAvailibilityByCityDtos[] = [];
        try {
            airbnbStaySearchDtos.map(airbnbStaySearchDto => {
                const city = airbnbStaySearchDto.city;
                const staySearchAvailibilityByCityDtos: StaySearchAvailibilityByCityDtos = {
                    city, 
                    places: airbnbStaySearchDto.data.data.presentation.explore.sections.sectionIndependentData.staysSearch.searchResults.map(
                        searchResult => {
                            if (!searchResult.listing || !searchResult.listing.id || !searchResult.listing.city || !searchResult.listing.name) {
                                throw new HttpException('Error al mapear los resultados de la busqueda', 500);
                            }
                            const parsedPlaceOfInterestAvailabilityDtos = new PlaceOfInterestAvailabilityDtos(
                                searchResult.listing.id,
                                searchResult.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price || searchResult.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.discountedPrice,
                                searchResult.pricingQuote?.structuredStayDisplayPrice?.secondaryLine?.price,
                                city,
                                searchResult.listing.city,
                                searchResult.listing.name
                            );
                            return parsedPlaceOfInterestAvailabilityDtos
                        }
                    )
                }
                staysSearchAvailibilityByCityDtos.push(staySearchAvailibilityByCityDtos);
            });
        } catch (error) {
            console.error(error);
            throw new HttpException('Error al mapear los resultados de la busqueda', 500);
        }

        return staysSearchAvailibilityByCityDtos;
    }
}