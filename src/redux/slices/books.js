import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  loading: false,
  errors: false,
  books: [],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooks: (state) => {
      state.loading = true;
    },
    getBooksSuccess: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getBooksFail: (state) => {
      state.loading = false;
      state.errors = true;
    },
  },
});

export const { getBooks, getBooksSuccess, getBooksFail } = booksSlice.actions;

// The Selector
export const booksSelector = (state) => state.books;

// The Reducer
export default booksSlice.reducer;

// Async Thunk
export function fetchBooks() {
  return async (dispatch) => {
    dispatch(getBooks());

    try {
      const { data } = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.REACT_APP_NYT_APIKEY}`
      );

      dispatch(getBooksSuccess(data));
    } catch (errors) {
      dispatch(getBooksFail());
    }
  };
}
