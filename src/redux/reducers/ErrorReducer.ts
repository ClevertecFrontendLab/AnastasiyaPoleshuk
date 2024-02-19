import { IRequestError } from '../../types/apiTypes';
import { IS_ERROR, ERROR } from '../actionTypes';
import initialState from '../initialState';

interface IAction {
    type: string;
    payload?: IRequestError | boolean;
}

export const ErrorReducer = (state = initialState as unknown as object, action: IAction) => {
    switch (action.type) {
        case IS_ERROR:
            return {
                ...state,
                isError: true,
            };
        case ERROR:
            return {
                ...state,
                requestError: action.payload,
                isError: true,
            };
        default:
            return state;
    }
};
