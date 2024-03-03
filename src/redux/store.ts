import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import bucket from "./slices/bucketSlice";
import pizza from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    filter,
    bucket,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
