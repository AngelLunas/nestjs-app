import {AirbnbStaySearchDto} from "../dto/actor/airbnb-stay-search.dto";
import { HttpException, Injectable } from "@nestjs/common";
import {LocationDetailsDtos, LocationsByRegion} from "@mtronic-llc/fahs-common-test";

@Injectable()
export class AirbnbStaySearchMapper {
    mapAirbnbStaySearchDtoToPlaceOfInterestAvailabilityDto(
        airbnbStaySearchDtos: AirbnbStaySearchDto[]): LocationsByRegion[] {
        let staysSearchAvailibilityByCityDtos: LocationsByRegion[] = [];
        try {
            airbnbStaySearchDtos.map(airbnbStaySearchDto => {
                const city = airbnbStaySearchDto.city;
                const staySearchAvailibilityByCityDtos: LocationsByRegion = {
                    city, 
                    places: airbnbStaySearchDto.data.data.presentation.explore.sections.sectionIndependentData.staysSearch.searchResults.map(
                        searchResult => {
                            if (!searchResult.listing || !searchResult.listing.id || !searchResult.listing.city || !searchResult.listing.name) {
                                throw new HttpException('Error al mapear los resultados de la busqueda', 500);
                            }
                            let totalPrice = searchResult.pricingQuote?.structuredStayDisplayPrice?.secondaryLine?.price;
                            let pricePerNight = searchResult.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price || searchResult.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.discountedPrice;
                            
                            if (totalPrice === undefined) {
                                totalPrice = searchResult.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price || searchResult.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.discountedPrice;
                                pricePerNight = undefined;
                            }

                            const parsedPlaceOfInterestAvailabilityDtos = new LocationDetailsDtos(
                                searchResult.listing.id,
                                pricePerNight,
                                totalPrice,
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