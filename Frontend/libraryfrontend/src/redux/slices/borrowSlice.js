import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
export const fetchBorrows = createAsyncThunk(
  "borrows/fetchBorrows",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/borrows");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const borrowBook = createAsyncThunk(
  "borrows/borrowBook",
  async (borrowData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/borrows", borrowData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const borrowSlice = createSlice({
  name: "borrows",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBorrows.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBorrows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(borrowBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default borrowSlice.reducer;
