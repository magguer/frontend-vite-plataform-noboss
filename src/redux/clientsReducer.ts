import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientType } from "../types/ClientTypes";

const initialState: any = null

const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        getClientsList: (state, action: PayloadAction<ClientType>) => {
            return action.payload
        },
        addClient: (state, action: PayloadAction<ClientType>) => {
            return [...state, action.payload]
        },
        removeClient: (state, action) => {
            return action.payload
        },
    },
});

export const { getClientsList, addClient, removeClient } = clientsSlice.actions;
export default clientsSlice.reducer;