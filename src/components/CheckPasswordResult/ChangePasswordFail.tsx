import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isErrorAction } from '@redux/actions/ErrorAction';
import { ChangePasswordThunk } from '@redux/thunks/ChangePasswordThunk';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import './CheckPasswordResult.scss';

export const ChangePasswordFail = () => {
    const { changePassword } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const retryRequest = () => {
        dispatch(isErrorAction(false));
        dispatch(
            push(
                `${CONSTANTS.ROUTER__PATH.AUTH__PATH}${CONSTANTS.ROUTER__PATH.CHANGE_PASSWORD__PATH}`,
            ),
        );
    };

    return (
        <Result
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз'
            extra={
                <Button
                    type='primary'
                    className='result__btn'
                    data-test-id='change-retry-button'
                    onClick={retryRequest}
                >
                    Повторить
                </Button>
            }
        />
    );
};
