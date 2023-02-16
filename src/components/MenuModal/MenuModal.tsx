import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import { Menu } from '../NavigationMenu/Menu';

import './MenuModal.scss';

export const MenuModal = () => {
    const { isModalOpen, closeModal } = useContext(AppContext);

    return (
        <section className={`menu-modal-overlay ${isModalOpen ? 'open-menu' : null}`} onClick={() => closeModal()}>
            <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
                <Menu isOpen={true} dataTestId='burger' />
                <hr />
                <NavLink to='profile' className="menu-model__profile">Профиль</NavLink>
                <button type='button' className="menu-model__exit-btn">Выход</button>
            </div>
        </section>
    );
};
