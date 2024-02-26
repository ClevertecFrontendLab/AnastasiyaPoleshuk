import StatusCodes from 'http-status-codes';

import { ICheckEmailResponse, IRequestError } from '../../types/apiTypes';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';
import { AppDispatch } from '@redux/configure-store';
import { CheckEmailAction } from '@redux/actions/AuthActions';
import { checkEmail } from '../../api/checkEmail';

export const CheckEmailThunk = (request: { email: string }) =>
    async function (dispatch: AppDispatch) {
        dispatch(LoadingAction(true));

        const response: { data: ICheckEmailResponse | IRequestError; status: number } =
            await checkEmail(request);

        if (response.status === StatusCodes.OK) {
            dispatch(CheckEmailAction(response.data as ICheckEmailResponse));
        } else {
            const errorObject = response.data.error
                ? response.data
                : {
                      statusCode: response.status,
                      error: '',
                      message: response.data.message,
                  };
            dispatch(ErrorAction(errorObject as IRequestError));
        }
        dispatch(LoadingAction(false));
    };
