import { Injectable } from "@nestjs/common";
import { Country,State,City } from 'country-state-city';


@Injectable()
export class LocationService {
    async fetchAllCountries(){
        const countries = await Country.getAllCountries().map(
            ({name,isoCode}) => {
                return {name,isoCode};
        });
        return countries;
    }

    async fetchAllStates(isoCode: string){
        const states = await State.getStatesOfCountry(isoCode).map(
            ({name,isoCode}) => {
                return {name,isoCode};
        });
        return states;
    }

    async fetchAllCities(countryCode: string, stateCode: string){
        const cities = await City.getCitiesOfState(countryCode,stateCode).map(({name}) => {
            return name;
        });
        return cities;
    }
}