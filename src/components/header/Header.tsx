import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <header className='header'>
            <NavLink to={'/'} className='header__home-link'>
                Главная
            </NavLink>
            <div className='header__info-box'>
                <p className='header__info-text'>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </p>
                <button type='button' className='header__info-settings-btn'>
                    Настройки
                </button>
            </div>
        </header>
    );
};
