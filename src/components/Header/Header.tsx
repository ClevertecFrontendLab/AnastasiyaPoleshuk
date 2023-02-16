import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

import './Header.scss';

export const Header = () => {
    const { isModalOpen, closeModal, openModal } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(isModalOpen);

    useEffect(() => {
        setIsMenuOpen(isModalOpen);
    }, [isModalOpen])

    const toggleMenu = () => {

        if (!isMenuOpen) {
            openModal()
        } else {
            closeModal()
        }
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <header className="header">
            <div className="header__container">
                <NavLink to="/" className="header__link" />
                <button type='button' className={isMenuOpen ? 'header__burger-active' : 'header__burger'} onClick={toggleMenu} data-test-id='button-burger' />
                <h1 className="header__title">Библиотека</h1>
                <div className="header__profile-block profile-block">
                    <h5 className="profile__greetings">Привет, Иван!</h5>
                    <NavLink to="/profile" className="profile__link" />
                </div>
            </div>
        </header>
    )
}
