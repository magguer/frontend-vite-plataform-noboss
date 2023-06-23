import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = null

const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        addDate: (_state, action: PayloadAction<any>) => {
            return action.payload
        },
    },
});

export const { addDate } = dateSlice.actions;
export default dateSlice.reducer;