import { Result, Button } from 'antd';
import './RegistrationResult.scss';
import CONSTANTS from '@utils/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { isErrorAction } from '@redux/actions/ErrorAction';
import { useEffect } from 'react';

export const RegistrationSuccessWindow = () => {
    const dispatch = useAppDispatch();
    const { isError } = useAppSelector((state) => state.error);

    useEffect(() => {
        if (!isError) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, [isError]);

    return (
        <Result
            className='registration__res'
            status='success'
            title='Регистрация успешна'
            subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
            extra={[
                <Button
                    type='primary'
                    onClick={() => dispatch(isErrorAction(false))}
                    className='registration__res_btn'
                >
                    Войти
                </Button>,
            ]}
        />
    );
};
