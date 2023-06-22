import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
}

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state,action) => {
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
        },
        resetProfile: (state) => {
            state.interest= '';
            state.email= '';
            state.title= '';
            state.firstName= '';
            state.middleName= '';
            state.lastName= '';
            state.mobile= '';
            state.birth= new Date(null);
            state.skills= [''];
            state.country= '';
            state.state= '';
            state.city= '';
        }
    }
})

export const { setProfile, resetProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer