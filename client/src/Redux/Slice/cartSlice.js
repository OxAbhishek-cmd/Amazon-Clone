import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      console.log("redux set cart");
      return [...action.payload.cartItems];
    },
    addToCart: (state, action) => {
      console.log("redux add cart");
      return [...state, action.payload.item];
    },
    updateToCart: (state, action) => {
      console.log("redux update cart");
      const { product_id, quantity } = action.payload.info;
      return state.map((item) =>
        item.product_id === product_id ? { ...item, quantity:parseInt(quantity) } : item
      );
    },

    deleteToCart: (state, action) => {
      console.log("redux delete cart");
      const { product_id } = action.payload.info;
      return state.filter(item => item.product_id !== product_id);
    },
    resetCart: (state, action) => {
      console.log("redux reset cart");
      return [];
    }
  }
});

export const { setCart, addToCart, updateToCart, deleteToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
