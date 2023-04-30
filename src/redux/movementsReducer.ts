import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MovementTypes from "../types/MovementTypes";

const initialState: any = null

const movementsSlice = createSlice({
    name: "movements",
    initialState,
    reducers: {
        getMovementsList: (state, action: PayloadAction<MovementTypes>) => {
            return action.payload
        },
        addMovement: (state, action: PayloadAction<MovementTypes>) => {
            return [...state, action.payload]
        },
        removeMovement: (state, action) => {
            return action.payload
        },
    },
});

export const { getMovementsList, addMovement, removeMovement } = movementsSlice.actions;
export default movementsSlice.reducer;