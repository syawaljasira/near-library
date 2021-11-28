import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  errors: false,
  readingLists: [],
};

export const readingListsSlice = createSlice({
  name: 'readingLists',
  initialState,
  reducers: {
    getReadingLists: (state) => {
      state.loading = true;
    },
    getReadingListsSuccess: (state, action) => {
      state.readingLists = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getReadingListsFail: (state) => {
      state.loading = false;
      state.errors = true;
    },
  },
});

export const { getReadingLists, getReadingListsSuccess, getReadingListsFail } =
  readingListsSlice.actions;

// The Selector
export const readingListsSelector = (state) => state.readingLists;

// The Reducer
export default readingListsSlice.reducer;

// Async Thunk
export function fetchReadingLists(data) {
  return async (dispatch) => {
    dispatch(getReadingLists());

    try {
      dispatch(getReadingListsSuccess(data));
      console.log('Success save the book to reading lists');
    } catch (errors) {
      dispatch(getReadingListsFail());
    }
  };
}
