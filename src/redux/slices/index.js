import { combineReducers } from '@reduxjs/toolkit';
import booksReducer from './books';

const rootReducer = combineReducers({
  books: booksReducer,
});

export default rootReducer;
