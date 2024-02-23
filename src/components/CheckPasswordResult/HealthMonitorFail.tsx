import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isErrorAction } from '@redux/actions/ErrorAction';
import { CheckEmailThunk } from '@redux/thunks/CheckEmailThunk';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';

export const HealthMonitorFail = () => {
    const { email } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const back = () => {
        dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        dispatch(isErrorAction(false));
        dispatch(CheckEmailThunk({ email }));
    };

    return (
        <Result
            status='500'
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
            extra={
                <Button
                    type='primary'
                    data-test-id='check-back-button'
                    className='result__btn'
                    onClick={back}
                >
                    Назад
                </Button>
            }
        />
    );
};
