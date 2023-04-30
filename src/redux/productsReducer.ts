import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductTypes from "../types/ProductTypes";

const initialState: any = null

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getList: (state, action: PayloadAction<ProductTypes>) => {
            return action.payload
        },
        addProduct: (state, action: PayloadAction<ProductTypes>) => {
            return [...state, action.payload]
        },
        remove: (state, action) => {
            return action.payload
        },
    },
});

export const { getList, addProduct, remove } = productsSlice.actions;
export default productsSlice.reducer;