import { IError } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { ERROR } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
  type: string,
  payload: IError,
}

export const ErrorReducer = (state = initialState as unknown as IStore, action: IAction) => {
  switch (action.type) {
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
