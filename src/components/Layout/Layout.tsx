import { GetFeedbacksFail } from '@components/FeedbacksResult/GetFeedbacksFail';
import { Loader } from '@components/Loader/Loader';
import { Navigation } from '@components/Navigation/Navigation';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { changeAuthState, setToken } from '@redux/slices/UserSlice';
import { push } from 'redux-first-history';
import CONSTANTS from '@utils/constants';

export const Layout = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const { isLoading: isLoadingUser } = useAppSelector((state) => state.user);
    const { isLoading: isLoadingChangePassword } = useAppSelector((state) => state.changePassword);
    const { isLoading: isLoadingFeedback } = useAppSelector((state) => state.feedbacks);
    const { isFeedbacksFailModalOpen } = useContext(AppContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (queryParams.get('accessToken')) {
            localStorage.setItem('jwtToken', queryParams.get('accessToken') as string);
            dispatch(changeAuthState(true));
            dispatch(setToken(queryParams.get('accessToken') as string));
            dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH));
        }
    }, []);

    return (
        <div className='app'>
            <Navigation />
            <Outlet />
            {(isLoadingUser || isLoadingChangePassword || isLoadingFeedback) && <Loader />}
            <GetFeedbacksFail isFeedbacksFailModalOpen={isFeedbacksFailModalOpen} />
        </div>
    );
};
