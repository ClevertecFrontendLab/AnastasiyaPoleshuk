import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
}
  from 'redux';
import thunk from 'redux-thunk';

import { BooksReducer } from './reducers/BooksReducer';
import { ErrorReducer } from './reducers/ErrorReducer';
import { CategoriesReducer } from './reducers/CategoriesReducer';

const rootReducer = combineReducers({
    books: BooksReducer,
    error: ErrorReducer,
    categories: CategoriesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
