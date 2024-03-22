import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthRequest, IUpdateUser } from '../../types/apiTypes';
import { authUser } from '../../api/loginUser';
import { registerUser } from '../../api/registerUser';
import { getUser } from 'src/api/getUser';
import { updateUser } from 'src/api/updateUser';

export const LoginUserThunk = createAsyncThunk('user/loginUser', async (request: IAuthRequest) => {
    const response = await authUser(request);
    return response;
});

export const RegisterUserThunk = createAsyncThunk(
    'user/registerUser',
    async (request: IAuthRequest) => {
        const response = await registerUser(request);
        return response;
    },
);

export const GetUserThunk = createAsyncThunk('user/getUser', async () => {
    const response = await getUser();
    return response;
});

export const UpdateUserThunk = createAsyncThunk('user/updateUser', async (request: IUpdateUser) => {
    const response = await updateUser(request);
    return response;
});
