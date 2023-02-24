import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { LayoutMainPage } from './components/LayoutMainPage/LayoutMainPage';
import { BookPage } from './pages/Book/BookPage';
import { Contract } from './pages/Contract/Contract';
import { MainPage } from './pages/Main/MainPage';
import { OtherPage } from './pages/OtherPage/OtherPage';
import { Profile } from './pages/Profile/Profile';
import { Terms } from './pages/Terms/Terms';


export const App = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route element={<LayoutMainPage />}>
                <Route path='/' element={<Navigate to='/books/all' />} />
                <Route path='/books/:category' element={<MainPage />} />
                <Route path='/books/other' element={<OtherPage />} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/terms" element={<Terms />} />
            </Route>
            <Route path='books/:category/:bookId' element={<BookPage />} />
            <Route path='profile' element={<Profile />} />
        </Route>
    </Routes>
);
