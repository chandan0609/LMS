import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    borrows: borrowReducer,
    categories: categoryReducer,
    users: userReducer,
  },
});
export default store;
