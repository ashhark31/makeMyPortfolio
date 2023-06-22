import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    country: {},
    state: {},
    confirmPassword: '',
}

export const ElementSlice = createSlice({
    name: 'element',
    initialState,
    reducers: {
        setCountryElement: (state,action) => {
            state.country = action.payload;
        },
        setStateElement: (state,action) => {
            state.state = action.payload;
        },
        setPasswordElement: (state,action) => {
            state.confirmPassword = action.payload;
        }
    }
})

export const { setCountryElement, setStateElement, setPasswordElement } = ElementSlice.actions;
export default ElementSlice.reducer;