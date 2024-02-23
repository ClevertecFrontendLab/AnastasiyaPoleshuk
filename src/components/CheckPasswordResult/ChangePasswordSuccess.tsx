import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import './CheckPasswordResult.scss';
import { IsCheckEmailSuccessAction } from '@redux/actions/AuthActions';

export const ChangePasswordSuccess = () => {
    const dispatch = useAppDispatch();

    const redirect = () => {
        dispatch(IsCheckEmailSuccessAction(false));
        dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
    };

    return (
        <Result
            status='success'
            title='Пароль успешно изменен'
            subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
            extra={
                <Button
                    type='primary'
                    data-test-id='change-entry-button'
                    className='result__btn'
                    onClick={redirect}
                >
                    Вход
                </Button>
            }
        />
    );
};
