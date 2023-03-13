import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { createComment } from '../../api/createComment';
import { ICommentsRequest, ICommentsResponse, IError } from '../../types/apiTypes';
import { CreateCommentsAction, IsCommentsAction } from '../actions/CreateCommentsActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const CreateCommentsThunk = (requestData: ICommentsRequest) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: ICommentsResponse | IError, status: number } = await createComment(requestData);

    if (response.status === StatusCodes.OK) {
        dispatch(CreateCommentsAction(response.data as ICommentsResponse));
        dispatch(IsCommentsAction(true));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(IsCommentsAction(false));
    }
    dispatch(LoadingAction(false));
};
