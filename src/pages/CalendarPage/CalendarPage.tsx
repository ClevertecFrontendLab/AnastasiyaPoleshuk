import { Header } from '@components/header/Header';
import './CalendarPage.scss';

import { CalengarWrapp } from '@components/CalengarWrapp/CalengarWrapp';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setToken, changeAuthState } from '@redux/slices/UserSlice';
import { useCallback, useContext, useEffect } from 'react';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { GetTrainingInfoThunk, GetTrainingListThunk } from '@redux/thunk/TrainingThunk';
import { GetTrainingsListFail } from '@components/ErrorModals/GetTrainingsListFail';
import { AppContext } from '../../context/AppContext';
import { changeGetTrainingListErrorState } from '@redux/slices/CalendarSlice';
import { CreateFeedbackSuccessModal } from '@components/FeedbacksResult/CreateFeedbackSuccessModal';

export const CalendarPage = () => {
    const { isAuth, accessToken } = useAppSelector((state) => state.user);
    const { isRepeatRequestNeeded, setStateOfRepeatRequest, isCreateFeedbackSuccessModalOpen } =
        useContext(AppContext);
    const { isGetTrainingInfoSuccess, isGetTrainingListError } = useAppSelector(
        (state) => state.calendar,
    );
    const dispatch = useAppDispatch();

    const callModalWindow = useCallback(() => {
        if (isGetTrainingListError) {
            GetTrainingsListFail(setStateOfRepeatRequest);
        }
    }, [isGetTrainingListError]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            dispatch(setToken(token));
            dispatch(changeAuthState(true));
        }
    }, []);

    useEffect(() => {
        if (isRepeatRequestNeeded) {
            changeGetTrainingListErrorState(false);
            dispatch(GetTrainingListThunk());
            setStateOfRepeatRequest(false);
        }
    }, [isRepeatRequestNeeded]);

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        } else {
            dispatch(GetTrainingInfoThunk(accessToken));
        }
    }, [isAuth]);

    useEffect(() => {
        callModalWindow();
    }, [isGetTrainingListError]);

    return (
        <div className='calendar__page'>
            <Header />
            <CalengarWrapp />
        </div>
    );
};
