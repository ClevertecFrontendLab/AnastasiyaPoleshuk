import { IAuthRequest, ILoginResponse, IRequestError } from '../types/apiTypes';

import { api, apiSetHeader } from './api';

export const authUser = async (request: IAuthRequest) => {
    try {
        const { data, status } = await api.post<ILoginResponse>('auth/login', request);

        apiSetHeader('Authorization', `Bearer ${data.accessToken}`);

        return { data, status };
    } catch (error) {
        const requestError = error as IRequestError;
        return { data: requestError, status: requestError.statusCode };
    }
};
