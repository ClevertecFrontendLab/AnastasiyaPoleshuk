import StatusCodes from 'http-status-codes';

import { IChangePasswordRequest, IRequestError } from '../../types/apiTypes';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';
import { AppDispatch } from '@redux/configure-store';
import { ChangePasswordAction } from '@redux/actions/AuthActions';
import { changePassword } from '../../api/changePassword';

export const ChangePasswordThunk = (request: IChangePasswordRequest) =>
    async function (dispatch: AppDispatch) {
        dispatch(LoadingAction(true));

        const response: { data: { message: string } | IRequestError; status: number } =
            await changePassword(request);

        if (response.status === StatusCodes.CREATED) {
            dispatch(ChangePasswordAction(request as IChangePasswordRequest));
        } else {
            const errorObject = response.data.error
                ? response.data
                : {
                      statusCode: response.status,
                      error: '',
                      message: '',
                  };

            dispatch(ErrorAction(errorObject as IRequestError));
        }
        dispatch(LoadingAction(false));
    };
