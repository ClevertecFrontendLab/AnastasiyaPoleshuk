import { IError } from '../../types/apiTypes';
import { ERROR } from '../actionTypes';

export const ErrorAction = (payload: IError) => {
  return { type: ERROR, payload };
};
