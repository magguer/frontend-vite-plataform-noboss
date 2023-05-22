import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceType } from "../types/ServiceTypes";

const initialState: any = null

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        getServicesList: (state, action: PayloadAction<ServiceType>) => {
            return action.payload
        },
        addService: (state, action: PayloadAction<ServiceType>) => {
            state.unshift(action.payload)
        },
        removeService: (state, action) => {
            return action.payload
        },
    },
});

export const { getServicesList, addService, removeService } = servicesSlice.actions;
export default servicesSlice.reducer;