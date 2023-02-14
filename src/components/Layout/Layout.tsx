import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'

import { IStore } from '../../types/storeTypes';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { MenuModal } from '../MenuModal/MenuModal';

export const Layout = () => {
    const categories = useSelector((state: IStore) => state.categories.categories);

    return (
        <React.Fragment>
            <Header />
            <div className="app">
                <Outlet />
            </div>
            <Footer />
            {
                categories.length > 0 && <MenuModal />
            }
            <ErrorModal />
        </React.Fragment>
    )
}
