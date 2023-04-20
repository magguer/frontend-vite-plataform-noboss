import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductTypes from "../types/ProductsTypes";

const initialState: any = null

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ProductTypes>) => {
            return action.payload
        },
        edit: (state, action: PayloadAction<ProductTypes>) => {
            return action.payload
        },
        remove: (state, action) => {
            return action.payload
        },
    },
});

export const { add, edit, remove } = productsSlice.actions;
export default productsSlice.reducer;