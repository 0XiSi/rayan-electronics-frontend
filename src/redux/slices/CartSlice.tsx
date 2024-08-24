import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Load the initial cart state from the cookie (if it exists)
const loadCartFromCookies = () => {
  const cartCookie = Cookies.get('cart');
  try {
    return cartCookie ? JSON.parse(cartCookie) : [];
  } catch (e) {
    console.error("Error parsing cart cookie", e);
    return [];
  }
};

const initialState = {
  loading: false,
  items: loadCartFromCookies(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.items.push(item);
      }

      // Update the cookie after adding the item
      Cookies.set('cart', JSON.stringify(state.items), { expires: 7 });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Update the cookie after removing the item
      Cookies.set('cart', JSON.stringify(state.items), { expires: 7 });
    },
    clearCart: (state) => {
      state.items = [];

      // Clear the cart cookie
      Cookies.remove('cart');
    },
  },
});

// Export actions and reducer
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
