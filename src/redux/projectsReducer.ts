import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import  ProjectsType  from "../types/ProjectsType";

const initialState: any = null

const projectsSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        getProjetsList: (state, action: PayloadAction<ProjectsType>) => {
            return action.payload
        },
        addProject: (state, action: PayloadAction<ProjectsType>) => {
            return [...state, action.payload]
        },
        removeProject: (state, action) => {
            return action.payload
        },
    },
});

export const { getProjetsList, addProject, removeProject } = projectsSlice.actions;
export default projectsSlice.reducer;