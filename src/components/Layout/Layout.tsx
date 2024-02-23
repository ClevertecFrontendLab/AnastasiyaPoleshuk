import { Loader } from '@components/Loader/Loader';
import { Navigation } from '@components/Navigation/Navigation';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { MainPage } from '@pages/MainPage';

export const Layout = () => {
    const { isLoading } = useAppSelector((state) => state.isLoading);

    return (
        <div className='app'>
            <Navigation />
            <MainPage />
            {isLoading && <Loader />}
        </div>
    );
};
