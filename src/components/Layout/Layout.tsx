import { GetFeedbacksFail } from '@components/FeedbacksResult/GetFeedbacksFail';
import { Loader } from '@components/Loader/Loader';
import { ModalWindow } from '@components/Modal/Modal';
import { Navigation } from '@components/Navigation/Navigation';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoading: isLoadingUser } = useAppSelector((state) => state.user);
    const { isLoading: isLoadingChangePAssword } = useAppSelector((state) => state.changePassword);
    const { isLoading: isLoadingFeedback } = useAppSelector((state) => state.feedbacks);
    const { isFeedbacksFailModalOpen } = useContext(AppContext);

    useEffect(() => {
        setIsLoading(isLoadingUser || isLoadingChangePAssword || isLoadingFeedback);
    }, [isLoadingUser, isLoadingChangePAssword, isLoadingFeedback]);

    return (
        <div className='app'>
            <Navigation />
            <Outlet />
            {isLoading && <Loader />}
            {isFeedbacksFailModalOpen && (
                <ModalWindow>
                    <GetFeedbacksFail />
                </ModalWindow>
            )}
        </div>
    );
};
