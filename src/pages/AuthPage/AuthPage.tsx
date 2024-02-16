import { useState } from 'react';
import './AuthPage.scss';
import logo from '../../../public/assets/svg/logo.svg';
import { NavLink } from 'react-router-dom';
import CONSTANTS from '@utils/constants';
import { LoginForm } from '@components/LoginForm/LoginForm';
import { RegistrationForm } from '@components/RegistrationForm/RegistrationForm';
import { Loader } from '@components/Loader/Loader';
import { IStore } from '../../types/storeTypes';
import { useSelector } from 'react-redux';

export const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { isLoading } = useSelector((state: IStore) => state.isLoading);

    return (
        <div className='auth-page'>
            <div className='auth__box'>
                <img src={logo} alt='logo' className='auth__logo' />
                <div className='auth__btn-box'>
                    <NavLink
                        to={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/login`}
                        className={`auth__btn ${isLoginForm ? ' auth__btn-active' : ''}`}
                        onClick={() => setIsLoginForm(true)}
                    >
                        Вход
                    </NavLink>
                    <NavLink
                        to={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`}
                        className={`auth__btn ${!isLoginForm ? ' auth__btn-active' : ''}`}
                        onClick={() => setIsLoginForm(false)}
                    >
                        Регистрация
                    </NavLink>
                </div>
                {isLoginForm ? <LoginForm /> : <RegistrationForm />}
            </div>
            {isLoading && <Loader />}
        </div>
    );
};
