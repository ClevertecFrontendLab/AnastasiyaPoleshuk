import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { IStore } from '../../types/storeTypes';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { HeaderNav } from '../HeaderNav/HeaderNav';
import { Loader } from '../Loader/Loader';
import { Menu } from '../NavigationMenu/Menu';

import './LayoutMainPage.scss';

export const LayoutMainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isNavModalOpen } = useContext(AppContext);
    const isLoadingState = useSelector((state: IStore) => state.isLoading.isLoading);
    const isAuth = useSelector((state: IStore) => state.isAuth.isAuth);
    const isErrorState = useSelector((state: IStore) => state.isError.isError);
    const categories = useSelector((state: IStore) => state.categories.categories);
    const jwt = useSelector((state: IStore) => state.user.user.jwt);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const [isError, setIsError] = useState(isErrorState);

    useEffect(() => {
        if (isAuth) {
            categories.length > 0 ? dispatch(GetBooksThunk(jwt) as unknown as AnyAction).then(() => {
                setIsLoading(false);
            })
                : (dispatch(GetCategoriesThunk(jwt) as unknown as AnyAction),
                    dispatch(GetBooksThunk(jwt) as unknown as AnyAction)
                ).then(() => {
                    setIsLoading(false);
                })
        } else {
            navigate('/auth');
        }

    }, [])

    useEffect(() => {
        setIsError(isErrorState);
    }, [isErrorState])

    useEffect(() => {
        setIsLoading(isLoadingState);
    }, [isLoadingState])

    return (
        <React.Fragment>
            <main className='main'>
                <div className='main__container'>
                    <div className="menu-wrapp">
                        <Menu isOpen={true} dataTestId='navigation' />
                    </div>
                    <Outlet />

                </div>
                {/* {
                    isNavModalOpen && <HeaderNav styleType='header-nav__block' />
                } */}
            </main>
            {
                isLoading ? <Loader /> : null
            }
            {
                isError ? isLoading ? null : <ErrorModal /> : null
            }

        </React.Fragment>
    )
}
