import { ILoginResponse } from '../../types/apiTypes';
import { AUTH_USER, IS_REGISTRATION_SUCCESS, IS_AUTH } from '../actionTypes';
import initialState from '../initialState';

interface IAction {
    type: string;
    payload?: ILoginResponse | boolean;
}

export const UserReducer = (state = initialState as unknown as object, action: IAction) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                token: action.payload,
                isError: false,
            };
        case IS_REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegisterSuccess: action.payload,
                isError: false,
            };
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.payload,
                isError: false,
            };
        default:
            return state;
    }
};
