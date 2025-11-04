import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/books");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/books", bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const bookSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    loading: false,
    error: null,
    currentBook: null,
  },
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentBook, clearFilters, setFilters, deleteBook,fetchBookById, createBook,updateBook } = bookSlice.actions;
export default bookSlice.reducer;
