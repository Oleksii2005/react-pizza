import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import bucket from "./slices/bucketSlice";
export default configureStore({
  reducer: {
    filter,
    bucket,
  },
});
