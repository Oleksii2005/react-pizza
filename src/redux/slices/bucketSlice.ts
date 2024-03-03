import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  types: string;
  price: number;
  count: number;
  imageUrl: string;
  sizes: number;
};
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};
const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCart = (state: RootState) => state.bucket;

export const selectBucketById = (id: string) => (state: RootState) =>
  state.bucket.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItems } =
  bucketSlice.actions;

export default bucketSlice.reducer;
