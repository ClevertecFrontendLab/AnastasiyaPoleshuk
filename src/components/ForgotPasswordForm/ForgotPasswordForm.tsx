import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AnyAction } from 'redux';
import { StatusCodes } from 'http-status-codes';

import { SendEmailThunk } from '../../store/thunks/SendEmailThunk';
import { IStore } from '../../types/storeTypes';

import './ForgotPasswordForm.scss';

export const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const error = useSelector((state: IStore) => state.error.error.error);
    const [inputError, setInputError] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<{ email: string }>({
        mode: 'all'
    });

    useEffect(() => {
        error.status !== StatusCodes.OK ?
            setError('email', { type: error.name, message: error.message })
            : null
    }, [error])

    const onSubmit: SubmitHandler<{ email: string }> = (data) => {
        dispatch(SendEmailThunk(data.email) as unknown as AnyAction)
        reset();
    };

    const validateEmail = (data: string) => {
        console.log(/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(data));

        // /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(data) ?
        //  null :
        //     setError('email', { type: 'error', message: 'Введие коррекный e-mail' })
    };

    const checkreQuired = (data: string) => {
        data.trim() ? validateEmail(data) : setInputError('Поле не может быть пустым')

        console.log(inputError);

    };

    return (
        <section className="reset-password-form__block">
            <div className="reset-password-form__link-block">
                <NavLink to="/auth" className="reset-password-form__redirect-link">
                    вход в личный кабинет
                </NavLink>
            </div>
            <form action="#" className='reset-password-form form' data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form__title">Восстановление пароля</h2>
                <input
                    className={`form__input ${errors.email ? 'form__highlight-error' : null}`}
                    placeholder="Email"
                    {...register('email', {
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/,
                            message: 'Введие коррекный e-mail'
                        },
                        onBlur: (e) => checkreQuired(e.target.value),
                        onChange: (e) => checkreQuired(e.target.value)
                    })}
                />
                <p className={`form__error ${errors.email ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                    {errors?.email?.message || inputError}
                </p>
                {/* {
                    errors.email && <p className={`form__error ${errors.email ? 'highlight-error' : 'hide-error'}`} data-test-id='hint' >{errors.email?.message}</p>
                } */}
                {/* <p className="form__description">На это email  будет отправлено письмо с инструкциями по восстановлению пароля</p> */}
                <button type="submit" className="form-btn">Восстановить</button>
            </form>
            <p className="reset-password-form__redirect-registration">
                Нет учётной записи?
                <NavLink to="/registration" className="reset-password-form__redirect-link-registration">
                    Регистрация
                </NavLink>
            </p>
        </section>
    )
}
