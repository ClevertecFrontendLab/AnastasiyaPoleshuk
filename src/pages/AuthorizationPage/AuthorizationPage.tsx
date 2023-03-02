import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AuthForm } from '../../components/AuthForm/AuthForm';
import { IStore } from '../../types/storeTypes';

import './AuthorizationPage.scss';

export const AuthorizationPage = () => {
    const isAuth = useSelector((state: IStore) => state.user.user.isAuth);

    return (
        <div className="auth">
            <h1 className="registration__title">CleverLand</h1>
            <section className="registration__block ">
                <AuthForm />
                {
                    isAuth ? null : <p className="registration__redirect">
                        Нет учётной записи?
                        <NavLink to="/registration" className="registration__redirect-link">
                            Регистрация
                        </NavLink>
                    </p>
                }
            </section>
        </div>
    )
}
