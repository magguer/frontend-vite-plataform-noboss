import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = null

const itemProfileSlice = createSlice({
    name: "itemProfile",
    initialState,
    reducers: {
        item: (state, action) => {
            return action.payload
        },
    },
});

export const { item } = itemProfileSlice.actions;
export default itemProfileSlice.reducer;