import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    on: false,
    type: 'default',
    message: 'message',
}

export const NotificationSlice = createSlice({
    name: 'notification-status',
    initialState,
    reducers: {
        activateNotify: (state) => {
            state.on = true;
        },
        deactivateNotify: (state) => {
            state.on = false;
        },
        setNotify: (state,action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
    }
})

export const { activateNotify, deactivateNotify, setNotify } = NotificationSlice.actions;
export default NotificationSlice.reducer;