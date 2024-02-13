import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages';

import './App.scss';
import { Layout } from '@components/Layout/Layout';

export const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<MainPage />} />
            </Route>
        </Routes>
    );
};
