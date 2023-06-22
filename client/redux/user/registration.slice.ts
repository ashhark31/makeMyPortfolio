import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegistrationDto } from "../../dto";

const initialState: RegistrationDto = {
    interest: '',
    email: '',
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    birth: new Date(null),
    skills: [''],
    country: '',
    state: '',
    city: '',
    password: '',
}

export const RegistrationSlice = createSlice({
    name: 'registration-form',
    initialState,
    reducers: {
        addRegistration: (state, action: PayloadAction<RegistrationDto>) => {
            state.interest = action.payload.interest;
            state.email = action.payload.email;
            state.title = action.payload.title;
            state.firstName = action.payload.firstName;
            state.middleName = action.payload.middleName;
            state.lastName = action.payload.lastName;
            state.mobile = action.payload.mobile;
            state.birth = action.payload.birth;
            state.skills = action.payload.skills;
            state.country = action.payload.country;
            state.state = action.payload.state;
            state.city = action.payload.city;
            state.password = action.payload.password;
        },
        resetRegistration: (state) => {
            state.interest = '';
            state.email = '';
            state.title = '';
            state.firstName = '';
            state.middleName = '';
            state.lastName = '';
            state.mobile = '';
            state.birth = new Date(null);
            state.skills = [''];
            state.country = '';
            state.state = '';
            state.city = '';
            state.password = '';
        }
    }
})

export const { addRegistration, resetRegistration } = RegistrationSlice.actions;
export default RegistrationSlice.reducer;