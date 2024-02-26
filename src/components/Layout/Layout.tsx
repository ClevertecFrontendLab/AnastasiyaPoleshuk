import { Loader } from '@components/Loader/Loader';
import { Navigation } from '@components/Navigation/Navigation';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { MainPage } from '@pages/MainPage';
import { useEffect, useState } from 'react';

export const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoading: isLoadingState } = useAppSelector((state) => state.isLoading);

    useEffect(() => {
        setIsLoading(isLoadingState);
    }, [isLoadingState]);

    return (
        <div className='app'>
            <Navigation />
            <MainPage />
            {isLoading && <Loader />}
        </div>
    );
};
