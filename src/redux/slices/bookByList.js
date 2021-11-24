import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  loading: false,
  errors: false,
  bookByList: {},
  title: '',
};

export const bookByListSlice = createSlice({
  name: 'bookByList',
  initialState,
  reducers: {
    getbookByList: (state) => {
      state.loading = true;
    },
    getbookByListSuccess: (state, action) => {
      state.bookByList = action.payload.data;
      state.loading = false;
      state.errors = false;
      state.title = action.payload.title;
    },
    getbookByListFail: (state) => {
      state.loading = false;
      state.errors = true;
    },
  },
});

export const { getbookByList, getbookByListSuccess, getbookByListFail } =
  bookByListSlice.actions;

// The Selector
export const bookByListSelector = (state) => state.bookByList;

// The Reducer
export default bookByListSlice.reducer;

// Async Thunk
export function fetchBookByList(published_date, list_name_encoded, title) {
  return async (dispatch) => {
    dispatch(getbookByList());

    try {
      const { data } = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/${published_date}/${list_name_encoded}.json?api-key=${process.env.REACT_APP_NYT_APIKEY}`
      );

      dispatch(getbookByListSuccess({ data: data, title: title }));
    } catch (errors) {
      dispatch(getbookByListFail());
    }
  };
}
