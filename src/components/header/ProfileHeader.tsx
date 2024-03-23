import './Header.scss';
import { SettingOutlined } from '@ant-design/icons';

export const ProfileHeader = () => {
    return (
        <header className='profile-header'>
            <h4 className='profile-header__title'>Профиль</h4>
            <button className='header__info-settings-btn' data-test-id='header-settings'>
                <SettingOutlined />
                <p>Настройки</p>
            </button>
        </header>
    );
};
