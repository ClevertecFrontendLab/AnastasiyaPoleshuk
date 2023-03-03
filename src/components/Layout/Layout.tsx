import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

import { IStore } from '../../types/storeTypes';
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { MenuModal } from '../MenuModal/MenuModal';

export const Layout = () => {
    const isAuth = useSelector((state: IStore) => state.isAuth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        isAuth  ? null : navigate('/auth');
    }, [isAuth])

    return (
        <React.Fragment>
            <Header />
            <div className="app">
                <Outlet />
            </div>
            <Footer />
            <MenuModal />
        </React.Fragment>
    )
}
