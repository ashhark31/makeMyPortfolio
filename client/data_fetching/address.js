import { addCities, addCountries, addStates } from '../redux/user/address.slice';
import axios from './axios'

export const getCountries = (callback) => {
    axios.get('/locations/countries').then(async (res) => {
        const data = await res?.data;
        callback(addCountries(data));
    }).catch(err => {
        console.log(err);
    })
}

export const getStatesByCountry = (country,callback) => {
    axios.get(`/locations/countries/${country}/states`).then(async (res) => {
        const data = await res?.data;
        callback(addStates(data));
    }).catch(err => {
        console.log(err);
    })
}

export const getCitiesByState = (country,state,callback) => {
    axios.get(`/locations/countries/${country}/states/${state}/cities`).then(async (res) => {
        const data = await res?.data;
        callback(addCities(data));
    }).catch(err => {
        console.log(err);
    })
}