import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { UserReducer } from './reducers/UserReducer';
import { configureStore } from '@reduxjs/toolkit';
import { LoadingReducer } from './reducers/LoadingReducer';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: {
        router: routerReducer,
        isAuth: UserReducer,
        isRegisterSuccess: UserReducer,
        token: UserReducer,
        isLoading: LoadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export const history = createReduxHistory(store);
