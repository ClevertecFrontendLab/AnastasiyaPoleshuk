import { Dispatch } from 'redux';
// import StatusCodes from 'http-status-codes';
import { getBook } from '../../api/getBook';
import { IError, IGetBook } from '../../types/apiTypes';
import { IGetBookResponse } from '../../types/storeTypes';
import { GetBookAction } from '../actions/BooksActions';
import { ErrorAction } from '../actions/ErrorAction';

export const GetBookThunk = (id: number) => {
  return async function (dispatch: Dispatch) {
    const response: IGetBookResponse = await getBook(id)

    if (response.status === 200) {
      dispatch(GetBookAction(response.data as IGetBook));
    } else {
        dispatch(ErrorAction(response.data as IError));
    }
  };
};
