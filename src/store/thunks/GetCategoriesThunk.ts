import { Dispatch } from 'redux';
// import StatusCodes from 'http-status-codes';
import { getCategories } from '../../api/getCategories';
import { ICategories, IError } from '../../types/apiTypes';
import { ICategoriesResponse } from '../../types/storeTypes';
import { CategoriesActions } from '../actions/CategoriesActions';
import { ErrorAction } from '../actions/ErrorAction';

export const GetCategoriesThunk = () => {
  return async function (dispatch: Dispatch) {
      const response: ICategoriesResponse = await getCategories();

    if (response.status === 200) {
        dispatch(CategoriesActions(response.data as ICategories));
    } else {
        dispatch(ErrorAction(response.data as IError));
    }
  };
};
