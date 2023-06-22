import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
}

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addLogin: (state,action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        resetLogin: (state) => {
            state.email = '';
            state.password = '';
        }
    }
})

export const { addLogin, resetLogin }  = LoginSlice.actions;
export default LoginSlice.reducer