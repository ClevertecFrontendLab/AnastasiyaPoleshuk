import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages';
import { Header } from '@components/header/Header';

import './App.scss';

export const App = () => {
    return (
        <div className='app'>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                </Routes>
            </HashRouter>
        </div>
    );
};
