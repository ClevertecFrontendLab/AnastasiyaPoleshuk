import { Button, Result } from 'antd';
import './LoginFailWindow.scss';
import { useNavigate } from 'react-router-dom';

export const LoginFailWindow = () => {
    const navigate = useNavigate();
    return (
        <Result
            className='loginFail__res'
            status='warning'
            title='Вход не выполнен'
            extra={
                <Button
                    type='primary'
                    onClick={() => navigate('/auth/login')}
                    className='loginFail__res_btn'
                >
                    Повторить
                </Button>
            }
        />
    );
};
