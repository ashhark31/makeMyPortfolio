import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 0,
}

export const TokenSlice = createSlice({
    name: 'user-token',
    initialState,
    reducers: {
        setStatus: (state,action) => {
            state.status = action.payload;
        },
        resetStatus: (state) => {
            state.status = 0;
        }
    }
})

export const { setStatus, resetStatus } = TokenSlice.actions;
export default TokenSlice.reducer;