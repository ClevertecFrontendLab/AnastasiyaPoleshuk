import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AnyAction } from 'redux';

import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { IStore } from '../../types/storeTypes';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { Loader } from '../Loader/Loader';
import { Menu } from '../NavigationMenu/Menu';

import './LayoutMainPage.scss';

export const LayoutMainPage = () => {
    const dispatch = useDispatch();
    const isLoadingState = useSelector((state: IStore) => state.isLoading);
    const isErrorState = useSelector((state: IStore) => state.isError);
    const categories = useSelector((state: IStore) => state.categories.categories);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const [isError, setIsError] = useState(isErrorState);

    useEffect(() => {
        categories.length > 0 ? dispatch(GetBooksThunk() as unknown as AnyAction).then(() => {
            setIsLoading(false);
        })
            : (dispatch(GetCategoriesThunk() as unknown as AnyAction),
                dispatch(GetBooksThunk() as unknown as AnyAction)
            ).then(() => {
                setIsLoading(false);
            })
    }, [])

    useEffect(() => {
        setIsError(!isError)
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
