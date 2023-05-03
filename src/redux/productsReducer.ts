import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/ProductTypes";

const initialState: any = null

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProductsList: (state, action: PayloadAction<ProductType>) => {
            return action.payload
        },
        addProduct: (state, action: PayloadAction<ProductType>) => {
            return [...state, action.payload]
        },
        removeProduct: (state, action) => {
            return action.payload
        },
    },
});

export const { getProductsList, addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;