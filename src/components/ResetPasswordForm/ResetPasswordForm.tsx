import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { StatusCodes } from 'http-status-codes';

import { ResetPasswordThunk } from '../../store/thunks/ResetPasswordThunk';
import { SendEmailThunk } from '../../store/thunks/SendEmailThunk';
import { IResetPasswordRequest } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';

import './ResetPasswordForm.scss';

export const ResetPasswordForm = ({ getResetPasswordData }: { getResetPasswordData: (data: IResetPasswordRequest) => void }) => {
    const dispatch = useDispatch();
    const error = useSelector((state: IStore) => state.error.error.error);
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [passwordError, setPasswordError] = useState({
        letters: false,
        numbers: false,
        length: false,
        all: false,
    });
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<{ password: string, passwordConfirmation: string }>({
        mode: 'all'
    });

    // useEffect(() => {
    //     error.status !== StatusCodes.OK ?
    //         setError('email', { type: error.name, message: error.message })
    //         : null
    // }, [error])

    const validatePassword = (value: string) => {

        // if (!value.trim()) {
        //     setPasswordError({
        //         letters: false,
        //         numbers: false,
        //         length: false,
        //         all: false,
        //     })
        // };
        if (value.length < 8) {
            setPasswordError(passwordError => ({
                ...passwordError,
                length: true
            }))
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                length: false
            }))
        };
        if (!/[0-9]+$/.test(value)) {
            setPasswordError(passwordError => ({
                ...passwordError,
                numbers: true
            }))
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                numbers: false
            }))
        };
        if (!/[A-Z]+$/.test(value)) {
            setPasswordError(passwordError => ({
                ...passwordError,
                letters: true
            }))
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                letters: false
            }))
        };
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
            setPasswordError({
                letters: false,
                numbers: false,
                length: false,
                all: true,
            })
        };

    };

    const checkPasswords = (password: string, passwordConfirmation: string) => {
        // dispatch(SendEmailThunk(data.email) as unknown as AnyAction)
        if (password !== passwordConfirmation) {
            setError('passwordConfirmation', { type: 'wrong password', message: 'different passwords' })
            console.log('in err: ', !!errors.passwordConfirmation);
        } else {
            clearErrors('passwordConfirmation');
            console.log('in else: ', !!errors.passwordConfirmation);
        }

        // console.log(password, passwordConfirmation);
        return true;
        // reset();
    };

    const onSubmit: SubmitHandler<{ password: string, passwordConfirmation: string }> = (data) => {
        dispatch(ResetPasswordThunk({
            ...data,
            code: searchParams.get('code') || ' ',
        }) as unknown as AnyAction);
        getResetPasswordData({
            ...data,
            code: searchParams.get('code') || ' ',
        })
        console.log(data);

        reset();
    };

    return (
        <section className="reset-password-form__block">
            <form action="#" className='reset-password-form form' data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form__title">Восстановление пароля</h2>
                <label className='form__label'>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Новый пароль"
                        className={`form__input ${errors.password ? 'form__highlight-error' : ''}`}
                        {...register('password', {
                            required: 'Поле не может быть пустым',
                            onChange: (e) => validatePassword(e.target.value),
                            onBlur: (e) => validatePassword(e.target.value),
                        })}
                        name='password'
                    />
                    <i className={`password-eye ${showPassword ? 'eye-open' : 'eye-close'}`} onClick={() => setShowPassword(!showPassword)} />
                    {
                        passwordError.all && <i className={`password-ok ${passwordError.all ? 'ok' : ''}`} data-test-id='checkmark' />
                    }
                </label>

                <p className={`form__input-info ${errors.password ? 'highlight-error' : ''}`} data-test-id='hint'>
                    {
                        errors.password?.message ||
                        <React.Fragment>
                            Пароль
                            <span className={`${passwordError.length ? 'highlight-error' : ''}`}>&nbsp;не менее 8 символов</span>,
                            с
                            <span className={`${passwordError.letters ? 'highlight-error' : ''}`}>&nbsp;заглавной буквой&nbsp;</span>
                            и
                            <span className={`${passwordError.numbers ? 'highlight-error' : ''}`}>&nbsp;цифрой</span>
                        </React.Fragment>
                    }

                </p>


                <label className='form__label'>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Повторите пароль"

                        className={`form__input ${errors.passwordConfirmation ? 'form__highlight-error' : ''}`}
                        // {...register('passwordConfirmation', { required: true })}
                        {...register('passwordConfirmation', { required: 'Поле не может быть пустым', validate: (value, formValues) => checkPasswords(value, formValues.password) })}
                        name='passwordConfirmation'
                    />
                    <i className={`password-eye ${showPassword ? 'eye-open' : 'eye-close'}`} onClick={() => setShowPassword(!showPassword)} />
                </label>

                <p className={`form__input-info ${errors.passwordConfirmation ? 'highlight-error' : ''}`} data-test-id='hint'>
                    {
                        errors.passwordConfirmation?.message || 'Пароли не совпадают'
                    }
                </p>
                <button type="submit" className="form-btn" disabled={errors.passwordConfirmation ? true : false} >сохранить изменения</button>
            </form>
            <p className="reset-password-form__info">
                После сохранения войдите в библиотеку, используя новый пароль
            </p>
        </section>
    )
}
