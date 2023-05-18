import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = null

const subcategoriesSlice = createSlice({
    name: "subcategories",
    initialState,
    reducers: {
        getSubcategoriesList: (state, action: PayloadAction<any>) => {
            return action.payload
        },
        addSubcategory: (state, action: PayloadAction<any>) => {
            return [...state, action.payload]
        },
        removeSubcategory: (state, action) => {
            return action.payload
        },
    },
});

export const { getSubcategoriesList, addSubcategory, removeSubcategory } = subcategoriesSlice.actions;
export default subcategoriesSlice.reducer;