import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  loading: false,
  errors: false,
  bookByList: {},
};

export const bookByListSlice = createSlice({
  name: 'bookByList',
  initialState,
  reducers: {
    getBookByList: (state) => {
      state.loading = true;
    },
    getBookByListSuccess: (state, action) => {
      state.bookByList = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getBookByListFail: (state) => {
      state.loading = false;
      state.errors = true;
    },
  },
});

export const { getBookByList, getBookByListSuccess, getBookByListFail } =
  bookByListSlice.actions;

// The Selector
export const bookByListSelector = (state) => state.bookByList;

// The Reducer
export default bookByListSlice.reducer;

// Async Thunk
export function fetchBookByList(list_name_encoded) {
  return async (dispatch) => {
    dispatch(getBookByList());

    try {
      const { data } = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/current/${list_name_encoded}.json?api-key=${process.env.REACT_APP_NYT_APIKEY}`
      );

      dispatch(getBookByListSuccess(data));
    } catch (errors) {
      dispatch(getBookByListFail());
    }
  };
}
