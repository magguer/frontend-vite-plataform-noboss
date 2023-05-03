import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartProduct(state, action: any) {
      const matchInCart = state.some(
        (detail:any) => detail.product.slug === action.payload.product.slug
      );
      if (matchInCart) {
        return state.map((detail:any) => {
          if (detail.product.slug === action.payload.product.slug && action.payload.quantity < detail.product.stock) {
            return {
              product: action.payload.product,
              quantity: action.payload.quantity + 1,
              fixed_price: action.payload.fixed_price,
            };
          } else {
            return detail;
          }
        });
      } else {
        if (action.payload.product.stock !== 0) {
          return [...state, action.payload];
        }
      }
    },
    removeCartProduct(state, action:any) {
      if (action.payload.quantity > 1) {
        return state.map((detail:any) => {
          if (detail.product.slug === action.payload.product.slug) {
            return {
              product: action.payload.product,
              quantity: action.payload.quantity - 1,
              fixed_price: action.payload.fixed_price,
            };
          } else {
            return detail;
          }
        });
      } else {
        return state.filter(
          (detail:any) => detail.product._id !== action.payload.product._id
        );
      }
    },
    removeCartAllThisProducts(state, action:any) {
      return state.filter(
        (detail:any) => detail.product._id !== action.payload.product._id
      );
    },
    removeCartEveryProducts() {
      return [];
    },
    addClient(state, action:any) {
      return {...state, client: action.payload};
    },
  },
});

export const {
  addCartProduct,
  removeCartProduct,
  removeCartAllThisProducts,
  removeCartEveryProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
