import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import  ProjectsType  from "../types/ProjectsType";
import { Project } from "../types/ProjectTypes";

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
        editProject: (state, action: PayloadAction<Project>) => {
            return state.map((project) => {
                if(project._id === action.payload._id) {
                    return action.payload
                } else {
                    return project
                }
            })
        },
        removeProject: (state, action) => {
            return action.payload
        },
    },
});

export const { getProjetsList, addProject, editProject, removeProject } = projectsSlice.actions;
export default projectsSlice.reducer;