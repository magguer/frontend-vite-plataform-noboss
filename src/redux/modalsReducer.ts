import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = null

const modalsSlice = createSlice({
    name: "itemProfile",
    initialState,
    reducers: {
        open: (state, action) => {
            return action.payload
        },
        close: (state, action) => {
            return action.payload
        },
    },
});

export const { open, close } = modalsSlice.actions;
export default modalsSlice.reducer;