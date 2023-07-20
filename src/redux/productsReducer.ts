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
        addProductsList: (state, action: PayloadAction<any>) => {
           return [...state, ...action.payload]
        },
        removeProductsList: () => {
            return null
        },
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.unshift(action.payload)
        },
        removeProduct: (state, action: PayloadAction<ProductType>) => {
            return state.filter((product: any) => product._id !== action.payload)
        },
    },
});

export const { getProductsList, addProductsList, removeProductsList, addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;