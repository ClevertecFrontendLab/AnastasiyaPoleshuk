import { Button, Checkbox, Form, Input } from 'antd';
import './RegistrationForm.scss';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterUserThunk } from '@redux/thunks/RegisterUserThunk';
import { RegisterAction } from '@redux/actions/AuthActions';

interface IRegistrationData {
    email: string;
    password: string;
    passwordRepeat: string;
}

export const RegistrationForm = () => {
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isPasswordsMatch, setIsVPasswordsMatch] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onFinish = (registrationData: IRegistrationData) => {
        if (isPasswordsMatch) {
            console.log('registrationData: ', registrationData);

            dispatch(
                RegisterUserThunk({
                    email: registrationData.email,
                    password: registrationData.password,
                }) as unknown as ReturnType<typeof RegisterAction>,
            );
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        setSubmitButtonDisabled(true);
    };

    const CheckEmail = (data: string) => {
        if (/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(data)) {
            setIsValidEmail(true);
            setSubmitButtonDisabled(false);
        } else {
            setIsValidEmail(false);
            setSubmitButtonDisabled(true);
        }
    };

    const CheckPassword = (data: string) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data)) {
            setIsValidPassword(true);
            setSubmitButtonDisabled(false);
        } else {
            setIsValidPassword(false);
            setSubmitButtonDisabled(true);
        }
        setIsVPasswordsMatch(false);
        setPassword(data);
    };

    const CheckPasswordsMatch = (repeatedPassword: string) => {
        if (repeatedPassword === password) {
            setSubmitButtonDisabled(false);
            setIsVPasswordsMatch(true);
        } else {
            setSubmitButtonDisabled(true);
            setIsVPasswordsMatch(false);
        }
    };

    return (
        <Form
            name='Registration'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='form'
        >
            <Form.Item
                name='email'
                rules={[{ required: true }]}
                validateStatus={isValidEmail ? 'success' : 'error'}
            >
                <Input
                    addonBefore='email:'
                    data-test-id='registration-email'
                    onChange={(e) => CheckEmail(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
                validateStatus={isValidPassword ? 'success' : 'error'}
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            >
                <Input.Password
                    className='form__input'
                    placeholder='Пароль'
                    onChange={(e) => CheckPassword(e.target.value)}
                    data-test-id='registration-password'
                />
            </Form.Item>

            <Form.Item
                name='passwordRepeat'
                rules={[{ required: true }]}
                validateStatus={isPasswordsMatch ? 'success' : 'error'}
                help={isPasswordsMatch ? '' : 'Пароли не совпадают'}
            >
                <Input.Password
                    className='form__input'
                    placeholder='Пароль'
                    onChange={(e) => CheckPasswordsMatch(e.target.value)}
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='form__button'
                    disabled={submitButtonDisabled}
                    data-test-id='registration-submit-button'
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
