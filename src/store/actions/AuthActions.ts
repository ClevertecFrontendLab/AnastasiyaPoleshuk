import { IUserResponse } from '../../types/apiTypes';
import { AUTH_USER, IS_AUTH, REGISTER_USER } from '../actionTypes';

export const IsAuthAction = (payload: boolean) => ({ type: IS_AUTH, payload });

export const AuthAction = (payload: IUserResponse) => ({ type: AUTH_USER, payload });

export const RegisterAction = (payload: IUserResponse) => ({ type: REGISTER_USER, payload });
