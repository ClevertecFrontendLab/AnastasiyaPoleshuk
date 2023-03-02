import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { StatusCodes } from 'http-status-codes';

import { AuthUserThunk } from '../../store/thunks/AuthUserThunk';
import { IAuthRequest } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';

import './AuthForm.scss';

export const AuthForm = () => {
    const isAuthState = useSelector((state: IStore) => state.isAuth.isAuth);
    const error = useSelector((state: IStore) => state.error.error.error);
    const [isAuth, setIsAuth] = useState(isAuthState);
    const [showPassword, setShowPassword] = useState(false);
    const [errorOpen, setIsErrorOpen] = useState(false);
    const [formData, setIsFormData] = useState({ identifier: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<IAuthRequest>();


    useEffect(() => {
        if (error.status === StatusCodes.BAD_REQUEST) {
            setError('identifier', { type: 'BAD_REQUEST' }, { shouldFocus: true })
            setError('password', { type: 'BAD_REQUEST' })
        }
        if (error.status !== StatusCodes.BAD_REQUEST && error.status !== StatusCodes.OK) {
            setIsErrorOpen(true);
        };

    }, [error])

    useEffect(() => {
        setIsAuth(!isAuth);
        isAuth ? navigate('/') : null;
    }, [isAuthState])

    const onSubmit: SubmitHandler<IAuthRequest> = (data) => {
        dispatch(AuthUserThunk(data) as unknown as AnyAction);
        setIsFormData(data);
        reset();
    };

    return (
        <div>
            <form className={`auth-form${errorOpen ? '-hide' : ''}`} onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form__title">Вход в личный кабинет</h2>
                <div className='form__inputs-box'>
                    <input
                        className={`form__input ${errors.identifier ? 'form__highlight-error' : ''}`}
                        placeholder="Логин"
                        {...register('identifier', { required: true })}
                    />
                    <label className='form__lable'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Пароль"
                            className={`form__input ${errors.password ? 'form__highlight-error' : ''}`}
                            {...register('password', { required: true })}
                        />
                        <i className={`password-eye ${showPassword ? 'eye-open' : 'eye-close'}`} onClick={() => setShowPassword(!showPassword)} />
                    </label>
                    {
                        Object.keys(errors).length ? <p className='form__warn'>Неверный логин или пароль!</p> : null
                    }
                    <NavLink to='/forgot-pass' className={`forgot-pass${Object.keys(errors).length ? '-active' : ''}`}>
                        {
                            Object.keys(errors).length ? "Восстановить?" : 'Забыли логин или пароль?'
                        }
                    </NavLink>
                    <input type="submit" className="form-btn" value='Вход' />
                </div>
            </form>
            {
                errorOpen &&
                <section className="auth-error__box">
                    <h2 className="auth-error__title">Вход не выполнен</h2>
                    <p className="auth-error__message">Что-то пошло не так. Попробуйте ещё раз</p>
                        <button type='button' className="auth-error__button" onClick={() => dispatch(AuthUserThunk(formData) as unknown as AnyAction)} >повторить</button>
                </section>
            }
        </div>

    )
}

