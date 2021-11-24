import { combineReducers } from '@reduxjs/toolkit';
import booksReducer from './books';
import bookByListReducer from './bookByList';

const rootReducer = combineReducers({
  books: booksReducer,
  bookByList: bookByListReducer,
});

export default rootReducer;
