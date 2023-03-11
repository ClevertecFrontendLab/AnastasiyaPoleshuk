import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
}
  from 'redux';
import thunk from 'redux-thunk';

import { BooksReducer } from './reducers/BooksReducer';
import { CategoriesReducer } from './reducers/CategoriesReducer';
import { ErrorReducer } from './reducers/ErrorReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { SendEmailReducer } from './reducers/SendEmailReducer';
import { UserReducer } from './reducers/UserReducer';

const rootReducer = combineReducers({
    books: BooksReducer,
    error: ErrorReducer,
    categories: CategoriesReducer,
    user: UserReducer,
    isAuth: UserReducer,
    isRegistration: UserReducer,
    isLoading: LoadingReducer,
    isError: ErrorReducer,
    SendEmailSuccess: SendEmailReducer,
    registrationRequest: UserReducer,
    isChangePasswordSuccess: UserReducer,
    authRequest: UserReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
