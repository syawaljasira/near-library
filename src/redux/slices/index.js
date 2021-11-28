import { combineReducers } from '@reduxjs/toolkit';
import booksReducer from './books';
import bookByListReducer from './bookByList';
import bookDetailsReducer from './bookDetails';
import readListsReducer from './readLists';

const rootReducer = combineReducers({
  books: booksReducer,
  bookByList: bookByListReducer,
  bookDetails: bookDetailsReducer,
  library: readListsReducer,
});

export default rootReducer;
