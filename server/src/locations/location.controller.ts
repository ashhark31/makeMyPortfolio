import { Controller, Get, Param } from "@nestjs/common";
import { LocationService } from "./location.service";

@Controller("countries")
export class LocationController{
    constructor(private locationService: LocationService){}

    @Get()
    getAllCountries(){
        return this.locationService.fetchAllCountries();
    }

    @Get(':id/states')
    getAllStates(@Param('id') isoCode: string){
        return this.locationService.fetchAllStates(isoCode);
    }

    @Get(':country/states/:state/cities')
    getAllCities(
        @Param('country') countryCode: string,
        @Param('state') stateCode: string){
        return this.locationService.fetchAllCities(countryCode,stateCode);
    }
}