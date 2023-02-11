import React from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { MenuModal } from '../MenuModal/MenuModal';

export const Layout = () => (
    <React.Fragment>
        <Header />
        <div className="app">
            <Outlet />
        </div>
        <Footer />
        <MenuModal />
    </React.Fragment>
)
