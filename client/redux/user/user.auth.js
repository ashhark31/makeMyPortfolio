import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
}

export const UserAuth = createSlice({
    name: 'user-auth',
    initialState,
    reducers: {
        setLoggedTrue: (state) => {
            state.isLogged = true;
        },
        setLoggedFalse: (state) => {
            state.isLogged = false;
        }
    }
})

export const { setLoggedTrue, setLoggedFalse } = UserAuth.actions;
export default UserAuth.reducer;