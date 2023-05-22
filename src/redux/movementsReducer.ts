import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovementType } from "../types/MovementTypes";

const initialState: any = null

const movementsSlice = createSlice({
    name: "movements",
    initialState,
    reducers: {
        getMovementsList: (state, action: PayloadAction<MovementType>) => {
            return action.payload
        },
        addMovement: (state, action: PayloadAction<MovementType>) => {
             state.unshift(action.payload)
        },
        removeMovement: (state, action) => {
            return action.payload   
        },
    },
});

export const { getMovementsList, addMovement, removeMovement } = movementsSlice.actions;
export default movementsSlice.reducer;