import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { useEffect } from 'react';
import { push } from 'redux-first-history';
import './ProfilePage.scss';
import { Header } from '@components/header/Header';

export const ProfilePage = () => {
    const { isAuth } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    return (
        <div className='profile'>
            <Header />
            ProfilePage
        </div>
    );
};
