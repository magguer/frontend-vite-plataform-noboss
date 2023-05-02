import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserType} from "../types/UserTypes";

const initialState: any = null

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserType>) => {
            return action.payload
        },
        edit: (state, action: PayloadAction<UserType>) => {
            return action.payload
        },
        logout: (state, action) => {
            return action.payload
        },
    },
});

export const { login, logout, edit } = userSlice.actions;
export default userSlice.reducer;