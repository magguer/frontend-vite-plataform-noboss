import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/ProductTypes";

const initialState: any = null

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProductsList: (state, action: PayloadAction<any>) => {
            return action.payload
        },
        removeProducts: () => {
            return null
        },
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.unshift(action.payload)
        },
        removeProduct: (state, action) => {
            return action.payload
        },
    },
});

export const { getProductsList, addProduct, removeProduct, removeProducts } = productsSlice.actions;
export default productsSlice.reducer;