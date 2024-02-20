import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import bucket from "./slices/bucketSlice";
import pizza from "./slices/pizzaSlice";
export default configureStore({
  reducer: {
    filter,
    bucket,
    pizza,
  },
});
