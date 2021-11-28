import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  errors: false,
  library: {
    readLists: [],
    readingLists: [],
    finishedLists: [],
  },
};

export const readListsSlice = createSlice({
  name: 'readLists',
  initialState,
  reducers: {
    addReadListRequest: (state) => {
      state.loading = true;
      state.errors = false;
    },
    addReadListSuccess: (state, action) => {
      state.loading = false;
      state.errors = false;
      state.library.readLists = action.payload;
    },
    addReadListFail: (state) => {
      state.loading = false;
      state.errors = true;
    },
    deleteReadListRequest: (state) => {
      state.loading = true;
      state.errors = false;
    },
    deleteReadListSuccess: (state) => {
      state.loading = false;
      state.errors = false;
    },
    deleteReadListFail: (state) => {
      state.loading = false;
      state.errors = true;
    },
    updateReadList: (state, action) => {
      const readList = state.library.readLists.filter(
        (book) => book.book_id === action.payload.book_id
      );
      return {
        ...state,
        library: {
          ...state.library,
          readLists: { ...state.library.readLists, status: readList.status },
        },
      };
    },
  },
});

export const {
  addReadListRequest,
  addReadListSuccess,
  addReadListFail,
  deleteReadListRequest,
  deleteReadListSuccess,
  deleteReadListFail,
  updateReadList,
} = readListsSlice.actions;

// The Selector
export const readListsSelector = (state) => state.library;

// The Reducer
export default readListsSlice.reducer;

// Async Thunk
