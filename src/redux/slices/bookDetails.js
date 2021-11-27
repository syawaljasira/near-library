import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  loading: false,
  errors: false,
  bookDetails: {},
};

export const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState,
  reducers: {
    getBookDetails: (state) => {
      state.loading = true;
    },
    getBookDetailsSuccess: (state, action) => {
      state.bookDetails = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getBookDetailsFail: (state) => {
      state.loading = false;
      state.errors = true;
    },
  },
});

export const { getBookDetails, getBookDetailsSuccess, getBookDetailsFail } =
  bookDetailsSlice.actions;

// The Selector
export const bookDetailsSelector = (state) => state.bookDetails;

// The Reducer
export default bookDetailsSlice.reducer;

// Async Thunk
export function fetchBookDetails(list_name_encoded) {
  return async (dispatch) => {
    dispatch(getBookDetails());

    try {
      const { data } = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/current/${list_name_encoded}.json?api-key=${process.env.REACT_APP_NYT_APIKEY}`
      );

      dispatch(getBookDetailsSuccess(data));
    } catch (errors) {
      dispatch(getBookDetailsFail());
    }
  };
}
