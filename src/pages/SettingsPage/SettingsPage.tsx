import { SettingsHeader } from '@components/header/SettingsHeader';
import './SettingsPage.scss';
import { SettingsWrapp } from '@components/SettingsWrapp/SettingsWrapp';
import { TariffDrawer } from '@components/TaliffDrawer/TariffDrawer';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { useEffect } from 'react';
import { push } from 'redux-first-history';

export const SettingsPage = () => {
    const { isAuth } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    return (
        <div className='settings'>
            <SettingsHeader />
            <SettingsWrapp />
            <TariffDrawer />
        </div>
    );
};
