import './Navigation.scss';
import logo from '../../../public/assets/svg/logo.svg';

import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';

import { CalendarIcon } from './Iconscomponents/CalendarIcon';
import { ProfileIcon } from './Iconscomponents/ProfileIcon';
import { AchievementsIcon } from './Iconscomponents/AchievementsIcon';
import { WorkoutIcon } from './Iconscomponents/WorkoutIcon';
import { LogoIcon } from './Iconscomponents/LogoIcon';
import { ExitIcon } from './Iconscomponents/ExitIcon';
import { LogoShortIcon } from './Iconscomponents/LogoShortIcon';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Календарь', '1', <CalendarIcon />),
    getItem('Тренировки', '2', <WorkoutIcon />),
    getItem('Достижения', '3', <AchievementsIcon />),
    getItem('Профиль', '4', <ProfileIcon />),
];

export const Navigation: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`nav__menu ${collapsed ? 'collapsed__menu' : 'not-collapsed__menu'}`}>
            {collapsed ? <LogoShortIcon /> : <LogoIcon />}
            <Button type='text' onClick={toggleCollapsed} className='nav__menu-btn'>
                {collapsed ? (
                    <MenuUnfoldOutlined className='menu-btn__icon' />
                ) : (
                    <MenuFoldOutlined className='menu-btn__icon' />
                )}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode='inline'
                theme='light'
                inlineCollapsed={collapsed}
                items={items}
                className={collapsed ? 'menu__collapsed' : 'menu'}
            ></Menu>
            <div className='nav__button-exit'>
                {collapsed ? (
                    <ExitIcon />
                ) : (
                    <>
                        <ExitIcon />
                        <span>Выход</span>
                    </>
                )}
            </div>
        </div>
    );
};
