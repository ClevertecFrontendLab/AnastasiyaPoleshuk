import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isErrorAction } from '@redux/actions/ErrorAction';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import './CheckPasswordResult.scss';
import { useEffect } from 'react';

export const CheckEmailFail = () => {
    const router = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const previousLocation = router.previousLocations
            ? router.previousLocations[1].location?.pathname
            : undefined;
        if (previousLocation !== CONSTANTS.ROUTER__PATH.AUTH__PATH) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    const retry = () => {
        dispatch(isErrorAction(false));
        dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
    };

    return (
        <Result
            status='error'
            title='Такой e-mail не зарегистрирован'
            subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
            extra={
                <Button
                    type='primary'
                    data-test-id='check-retry-button'
                    className='result__btn check-retry-button'
                    onClick={retry}
                >
                    Попробовать снова
                </Button>
            }
        />
    );
};
