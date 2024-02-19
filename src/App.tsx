import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages';

import './App.scss';
import { Layout } from '@components/Layout/Layout';
import CONSTANTS from '@utils/constants';
import { AuthPage } from '@pages/AuthPage/AuthPage';
import { ResultPage } from '@pages/ResultPage/ResultPage';
import { LoginForm } from '@components/LoginForm/LoginForm';
import { RegistrationForm } from '@components/RegistrationForm/RegistrationForm';
import { LoginFailWindow } from '@components/LoginFailWindow/LoginFailWindow';
import { RegistrationFailWindow } from '@components/RegistrationResult/RegistrationFailWindow';
import { RegistrationFailEmailWindow } from '@components/RegistrationResult/RegistrationFailEmailWindow';
import { RegistrationSuccessWindow } from '@components/RegistrationResult/RegistrationSuccessWindow';

export const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<Navigate to={CONSTANTS.ROUTER__PATH.MAIN__PATH} />} />
                <Route path={CONSTANTS.ROUTER__PATH.MAIN__PATH} element={<MainPage />} />
            </Route>
            <Route path={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`} element={<AuthPage />}>
                <Route index element={<LoginForm />} />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`}
                    element={<RegistrationForm />}
                />
            </Route>

            <Route path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}`} element={<ResultPage />}>
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.LOGIN__PATH}`}
                    element={<LoginFailWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.SUCCESS.SUCCESS__PATH}`}
                    element={<RegistrationSuccessWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.LOGIN__PATH}`}
                    element={<LoginFailWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.USER_EXIT__PATH}`}
                    element={<RegistrationFailEmailWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.ERROR__PATH}`}
                    element={<RegistrationFailWindow />}
                />
            </Route>
        </Routes>
    );
};
