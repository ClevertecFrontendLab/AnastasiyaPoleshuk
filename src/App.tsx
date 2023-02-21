import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { LayoutMainPage } from './components/LayoutMainPage/LayoutMainPage';
import { BookPage } from './pages/Book/BookPage';
import { BusinessPage } from './pages/BusinessPage/BusinessPage';
import { ChildishPage } from './pages/ChildishPage/ChildishPage';
import { Contract } from './pages/Contract/Contract';
import { DesignPage } from './pages/DesignPage/DesignPage';
import { FictionPage } from './pages/FictionPage/FictionPage';
import { HobbyPage } from './pages/HobbyPage/HobbyPage';
import { MainPage } from './pages/Main/MainPage';
import { NonFictionPage } from './pages/NonFictionPage/NonFictionPage';
import { OtherPage } from './pages/OtherPage/OtherPage';
import { ParentsPage } from './pages/ParentsPage/ParentsPage';
import { Profile } from './pages/Profile/Profile';
import { ProgrammingPage } from './pages/ProgrammingPage/ProgrammingPage';
import { PsychologyPage } from './pages/PsychologyPage/PsychologyPage';
import { Terms } from './pages/Terms/Terms';


export const App = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route element={<LayoutMainPage />}>
                <Route path='/' element={<Navigate to='/books/all' />} />
                <Route path='/books/:category' element={<MainPage />} />
                <Route path='/books/business' element={<BusinessPage />} />
                <Route path='/books/psychology' element={<PsychologyPage />} />
                <Route path='/books/parents' element={<ParentsPage />} />
                <Route path='/books/non-fiction' element={<NonFictionPage />} />
                <Route path='/books/fiction' element={<FictionPage />} />
                <Route path='/books/programming' element={<ProgrammingPage />} />
                <Route path='/books/hobby' element={<HobbyPage />} />
                <Route path='/books/design' element={<DesignPage />} />
                <Route path='/books/childish' element={<ChildishPage />} />
                <Route path='/books/other' element={<OtherPage />} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/terms" element={<Terms />} />
            </Route>
            <Route path='books/:category/:bookId' element={<BookPage />} />
            <Route path='profile' element={<Profile />} />
        </Route>
    </Routes>
);
