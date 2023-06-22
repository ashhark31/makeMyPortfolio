import { configureStore } from "@reduxjs/toolkit";
import { AddressSlice, AdminAuth, AdminTokenSlice, ElementSlice, LoginSlice, NotificationSlice, ProfileSlice, RegistrationForm, TokenSlice, UserAuth } from "./redux";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
    reducer: {
        form: RegistrationForm,
        notify: NotificationSlice,
        address: AddressSlice,
        element: ElementSlice,
        login: LoginSlice,
        token: TokenSlice,
        profile: ProfileSlice,
        userAuth: UserAuth,
        adminToken: AdminTokenSlice,
    },
    middleware: getDefaultMiddleware =>  getDefaultMiddleware({
        serializableCheck: false,
    }),
})

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);