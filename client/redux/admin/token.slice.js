import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 0,
}

export const AdminTokenSlice = createSlice({
    name: 'admin-token',
    initialState,
    reducers: {
        setAdminStatus: (state,action) => {
            state.status = action.payload;
        },
        resetAdminStatus: (state) => {
            state.status = 0;
        }
    }
})

export const { setAdminStatus, resetAdminStatus } = AdminTokenSlice.actions;
export default AdminTokenSlice.reducer;