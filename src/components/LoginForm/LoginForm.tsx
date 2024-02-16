import { Button, Checkbox, Form, Input } from 'antd';

import './LoginForm.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import CONSTANTS from '@utils/constants';
import { GooglePlusOutlined } from '@ant-design/icons';
import { IAuthRequest } from '../../types/apiTypes';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUserThunk } from '@redux/thunks/LoginUserThunk';
import { AnyAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { IStore } from '../../types/storeTypes';

export const LoginForm = () => {
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const { token } = useSelector((state: IStore) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values: IAuthRequest) => {
        if (isValidPassword && isValidEmail) {
            dispatch(
                LoginUserThunk({
                    email: values.email,
                    password: values.password,
                }) as unknown as AnyAction,
            ).then(() => {
                values.remember && localStorage.setItem('jwtToken', token as string);
                navigate('/main');
            });
        }
    };

    const CheckPassword = (data: string) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data)) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
        }
    };

    return (
        <Form
            name='Login'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            className='form'
        >
            <Form.Item name='email' rules={[{ required: true }]}>
                <Input addonBefore='email:' data-test-id='login-email' />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true }]}>
                <Input.Password
                    className='form__input'
                    placeholder='Пароль'
                    onChange={(e) => CheckPassword(e.target.value)}
                    data-test-id='login-password'
                />
            </Form.Item>

            <div className='form__items-box'>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox className='form__item' data-test-id='login-remember'>
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <NavLink
                    className='form__item'
                    to={CONSTANTS.ROUTER__PATH.CHANGE_PASSWORD__PATH}
                    data-test-id='login-forgot-button'
                >
                    Забыли пароль?
                </NavLink>
            </div>

            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='form__button'
                    data-test-id='login-submit-button'
                >
                    Войти
                </Button>
            </Form.Item>
            <Button className='form__button'>
                <GooglePlusOutlined />
                Регистрация через Google
            </Button>
        </Form>
    );
};
