import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectType } from "../types/ProjectTypes";

const initialState: any = null

const roleProjectSlice = createSlice({
    name: "roleProject",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ProjectType>) => {
            return action.payload
        },
        edit: (state, action: PayloadAction<ProjectType>) => {
            return action.payload
        },
        remove: (state, action) => {
            return action.payload
        },
    },
});

export const { add, edit, remove } = roleProjectSlice.actions;
export default roleProjectSlice.reducer;