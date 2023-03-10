/* eslint-disable complexity */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { AnyAction } from 'redux';

import { SetUserRegisterRequestAction } from '../../store/actions/AuthActions';
import { RegisterUserThunk } from '../../store/thunks/RegisterUserThunk';
import { IRegistrationRequest } from '../../types/apiTypes';

import './RegistrationForm.scss'

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const [stepCount, setStepCount] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [phone, setPhone] = useState('');
    const [inputError, setInputError] = useState({
        letters: false,
        numbers: false,
        all: false,
    });
    const [passwordError, setPasswordError] = useState({
        letters: false,
        numbers: false,
        length: false,
        all: false,
    });
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors, isValid },
    } = useForm<IRegistrationRequest>({
        mode: 'all'
    });

    const onSubmit: SubmitHandler<IRegistrationRequest> = (data) => {

        dispatch(RegisterUserThunk({
            ...data,
            phone
        }) as unknown as AnyAction)
            .then(() => {
                dispatch(SetUserRegisterRequestAction({
                    ...data,
                    phone
                }));
                navigate('/registration');
            })


        reset();
    };

    const CheckInputs = () => {

        if (!Object.keys(errors).length) {
            setStepCount(stepCount + 1);
        }
    }

    const validateLogin = (value: string) => {
        if (!value.trim()) {
            setInputError({
                letters: false,
                numbers: false,
                all: false,
            })
        };
        if (/[0-9]+$/.test(value)) {
            setInputError(inputError => ({
                ...inputError,
                numbers: false
            }))
        };
        if (/[A-Za-z]+$/.test(value)) {
            setInputError(inputError => ({
                ...inputError,
                letters: false
            }))
        };
        if (!/[0-9]+$/.test(value)) {
            setInputError(inputError => ({
                ...inputError,
                numbers: true
            }))
        };
        if (!/[A-Za-z]+$/.test(value)) {
            setInputError(inputError => ({
                ...inputError,
                letters: true
            }))
        };
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}$/.test(value)) {
            setInputError({
                letters: false,
                numbers: false,
                all: false,
            });

        };
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}$/.test(value)) {
            setInputError({
                letters: false,
                numbers: false,
                all: true,
            });
        };
    };

    const validatePassword = (value: string) => {

        if (!value.trim()) {
            setPasswordError({
                letters: false,
                numbers: false,
                length: false,
                all: false,
            })
        };
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

    const toggleEye = () => {
        setShowPassword(!showPassword)
    };

    const setPhoneValue = (value: string) => {
        setPhone(value)
    };

    const checkPhone = (value: string) => {
        value.trim() ? null : setError('phone', { type: 'empty value', message: 'Поле не может быть пустым' });
    };

    const checkLogin = (value: string) => {
        if (inputError.all) {
            setDisabled(true)
            setError('username', { type: 'wrong value', message: 'Используйте для логина латинский алфавит и цифры' });


        } else {
            setDisabled(false);
            clearErrors('username');
        }
    };

    const checkPassword = (value: string) => {
        if (passwordError.all) {
            setDisabled(true)
            setError('password', { type: 'wrong value', message: 'Пароль не менее 8 символов с заглавной буквой и цифрой' });
        } else {
            setDisabled(false);
            clearErrors('password');
        }
    };

    return (
        <React.Fragment>
            <form className="registration__form form" data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form__title">Регистрация</h2>
                <h5 className="form__subtitle">{stepCount} шаг из 3</h5>

                <div className={`form__inputs-box ${stepCount !== 1 ? 'hide-box' : ''}`}>
                    <input

                        className={`form__input ${errors.username ? 'form__highlight-error' : ''}`}
                        placeholder="Придумайте логин для входа"
                        {...register('username', {
                            required: 'Поле не может быть пустым',
                            onChange: (e) => validateLogin(e.target.value),
                        })}
                    />
                    <p className={`form__input-info ${errors.username ? 'highlight-error' : ''}`} data-test-id='hint'>
                        {
                            errors.username?.message ||
                            <React.Fragment>
                                Используйте для логина
                                <span className={`${inputError.letters ? 'highlight-error' : ''}`}>&nbsp; латинский алфавит &nbsp;</span>
                                и
                                <span className={`${inputError.numbers ? 'highlight-error' : ''}`}>&nbsp;цифры</span>
                            </React.Fragment>
                        }
                    </p>

                    <label className='form__label'>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Пароль"
                            className={`form__input ${errors.password ? 'form__highlight-error' : ''}`}
                            {...register('password', {
                                required: 'Поле не может быть пустым',
                                onChange: (e) => validatePassword(e.target.value),
                                // onBlur: (e) => checkPassword(e.target.value)
                            })}
                        />
                        <i className={`password-eye eye-open ${showPassword ? '' : 'hide-eye'}`} onClick={() => toggleEye()} data-test-id='eye-opened' />
                        <i className={`password-eye eye-close ${showPassword ? 'hide-eye' : ''}`} onClick={() => toggleEye()} data-test-id='eye-closed' />
                        {
                            passwordError.all && <i className={`password-ok ${passwordError.all ? 'ok' : ''}`} data-test-id='checkmark' />
                        }
                    </label>

                    <p className={`form__input-info ${errors.password ? 'highlight-error' : ''}`} data-test-id='hint'>
                        {
                            errors.password?.message ||
                            <React.Fragment>
                                Пароль
                                <span className={`${passwordError.length ? 'highlight-error' : ''}`}>не менее 8 символов</span>,
                                с
                                <span className={`${passwordError.letters ? 'highlight-error' : ''}`}>&nbsp;заглавной буквой&nbsp;</span>
                                и
                                <span className={`${passwordError.numbers ? 'highlight-error' : ''}`}>&nbsp;цифрой</span>
                            </React.Fragment>
                        }

                    </p>
                    <button
                        type="button"
                        className="form-btn"
                        onClick={CheckInputs}
                        disabled={disabled}
                    >
                        следующий шаг
                    </button>
                </div>
                <div className={`form__inputs-box ${stepCount !== 2 ? 'hide-box' : ''}`}  >
                    <input
                        className={`form__input ${errors.firstName ? 'form__highlight-error' : null}`}
                        placeholder="Имя"
                        {...register('firstName', { required: 'Поле не может быть пустым' })}
                    />
                    <p className={`form__input-info ${errors.firstName ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                        {errors?.firstName?.message}
                    </p>
                    < input
                        placeholder="Фамилия"
                        className={`form__input ${errors.lastName ? 'form__highlight-error' : null}`}
                        {...register('lastName', { required: 'Поле не может быть пустым' })}
                    />
                    <p className={`form__input-info ${errors.lastName ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                        {errors?.lastName?.message}
                    </p>

                    <button
                        type="button"
                        className="form-btn"
                        onClick={CheckInputs}
                        disabled={!!errors.firstName || !!errors.lastName}
                    >
                        последний шаг
                    </button>
                </div>
                <div className={`form__inputs-box ${stepCount !== 3 ? 'hide-box' : ''}`}>
                    <MaskedInput
                        className={`form__input ${errors.phone ? 'input-error' : null}`}
                        name='phone'
                        placeholderChar="x"
                        value={`+375 ${phone}`}
                        mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                        type='tel'
                        onChange={(e) => setPhoneValue(e.target.value)}
                        onBlur={(e) => checkPhone(e.target.value)}
                    />
                    <p className={`form__input-info ${errors.phone ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                        {
                            errors.phone?.message || 'В формате +375 (xx) xxx-xx-xx'
                        }
                    </p>
                    < input
                        placeholder="E-mail"
                        className={`form__input ${errors.email ? 'input-error' : null}`}
                        {...register('email', { required: 'Поле не может быть пустым', pattern: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/ })}
                    />
                    <p className={`form__input-info ${errors.email ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                        {
                            errors.email?.message || 'Введите корректный e-mail'
                        }
                    </p>

                    <button type="submit" className="form-btn" disabled={!isValid}>Зарегистрироваться</button>
                </div>

            </form>

            <p className="registration__redirect">
                Есть учётная запись?
                <NavLink to="/auth" className="registration__redirect-link">
                    войти
                </NavLink>
            </p>
        </React.Fragment>
    )
}
