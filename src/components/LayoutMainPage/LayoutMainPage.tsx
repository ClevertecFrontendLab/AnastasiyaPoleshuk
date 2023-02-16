import { Outlet } from 'react-router-dom';

import { Menu } from '../NavigationMenu/Menu';

import './LayoutMainPage.scss';

export const LayoutMainPage = () => (
        <main className='main'>
            <div className='main__container'>
                <div className="menu-wrapp">
                    <Menu isOpen={true} dataTestId='navigation' />
                </div>
                <Outlet />
            </div>
        </main>
    )
