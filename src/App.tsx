import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages';

import './App.scss';
import { Layout } from '@components/Layout/Layout';
import CONSTANTS from '@utils/constants';
import { AuthPage } from '@pages/AuthPage/AuthPage';
import { ResultPage } from '@pages/ResultPage/ResultPage';

export const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<Navigate to={CONSTANTS.ROUTER__PATH.MAIN__PATH} />} />
                <Route path={CONSTANTS.ROUTER__PATH.MAIN__PATH} element={<MainPage />} />
            </Route>
            <Route path={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/:type`} element={<AuthPage />} />
            <Route
                path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}/:type`}
                element={<ResultPage />}
            />
        </Routes>
    );
};
