import { ILoginResponse } from '../../types/apiTypes';
import { REGISTER_USER, AUTH_USER, IS_AUTH } from '../actionTypes';

export const IsAuthAction = (payload: boolean) => ({ type: IS_AUTH, payload });

export const LoginAction = (payload: ILoginResponse) => ({ type: AUTH_USER, payload });

export const RegisterAction = (payload: boolean) => ({ type: REGISTER_USER, payload });
