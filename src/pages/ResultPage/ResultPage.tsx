import './ResultPage.scss';
import { Loader } from '@components/Loader/Loader';
import { IStore } from '../../types/storeTypes';
import { useSelector } from 'react-redux';
import { LoginFailWindow } from '@components/LoginFailWindow/LoginFailWindow';

export const ResultPage = () => {
    const { isLoading } = useSelector((state: IStore) => state.isLoading);

    return (
        <div className='result-page'>
            <div className='result__box'>
                <LoginFailWindow />
            </div>
            {isLoading && <Loader />}
        </div>
    );
};
