import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = null

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        getCategoriesList: (state, action: PayloadAction<any>) => {
            return action.payload
        },
        addCategory: (state, action: PayloadAction<any>) => {
            return [...state, action.payload]
        },
        removeCategory: (state, action) => {
            return action.payload
        },
    },
});

export const { getCategoriesList, addCategory, removeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;