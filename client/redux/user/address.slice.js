import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    countries: {},
    states: {},
    cities: [''],
}

export const AddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addCountries: (state,action) => {
            state.countries = action.payload;
        },
        addStates: (state,action) => {
            state.states = action.payload;
        },
        addCities: (state,action) => {
            state.cities = action.payload;
        },
        resetStates: (state) => {
            state.states = {};
        },
        resetCities: (state) => {
            state.cities = [''];
        },
    }
})

export const { addCountries,addStates,addCities,resetStates,resetCities } = AddressSlice.actions;
export default AddressSlice.reducer;