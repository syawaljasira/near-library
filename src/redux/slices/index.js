import { combineReducers } from '@reduxjs/toolkit';
import booksReducer from './books';
import bookByListReducer from './bookByList';
import bookDetailsReducer from './bookDetails';

const rootReducer = combineReducers({
  books: booksReducer,
  bookByList: bookByListReducer,
  bookDetails: bookDetailsReducer,
});

export default rootReducer;
