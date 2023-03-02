import { IUserResponse } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { AUTH_USER, IS_AUTH, IS_REGISTRATION,REGISTER_USER } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: IUserResponse | boolean,
}

export const UserReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isError: false,
            };
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isError: false,
            };
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.payload,
            };
        case IS_REGISTRATION:
            return {
                ...state,
                isRegistration: action.payload,
            };
        default:
            return state;
    }
};
