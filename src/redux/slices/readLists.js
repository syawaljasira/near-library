import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  errors: false,
  library: {
    readLists: [],
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
    updateReadListRequest: (state) => {
      state.loading = true;
      state.errors = false;
    },
    updateReadListSuccess: (state) => {
      state.loading = false;
      state.errors = false;
    },
    updateReadListFail: (state) => {
      state.loading = false;
      state.errors = true;
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
  updateReadListRequest,
  updateReadListSuccess,
  updateReadListFail,
} = readListsSlice.actions;

// The Selector
export const readListsSelector = (state) => state.library;

// The Reducer
export default readListsSlice.reducer;
