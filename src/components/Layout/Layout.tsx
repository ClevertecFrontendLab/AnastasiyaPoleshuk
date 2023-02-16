import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { AnyAction } from 'redux';
import StatusCodes from 'http-status-codes';

import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { IStore } from '../../types/storeTypes';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Loader } from '../Loader/Loader';
import { MenuModal } from '../MenuModal/MenuModal';

export const Layout = () => {
    const dispatch = useDispatch();
    const isLoadingState = useSelector((state: IStore) => state.isLoading);
    const error = useSelector((state: IStore) => state.error.error);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const { bookId } = useParams();
    const id = bookId ? +bookId : 2;


    useEffect(() => {
        bookId ? dispatch(GetBookThunk(id) as unknown as AnyAction).then(() => {
            setIsLoading(false);
        })
            : (dispatch(GetCategoriesThunk() as unknown as AnyAction),
                dispatch(GetBooksThunk() as unknown as AnyAction)
            ).then(() => {
                setIsLoading(false);
            })
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="app">
                <Outlet />
                {
                    error.error.status !== StatusCodes.OK && <ErrorModal />
                }
            </div>
            <Footer />
            <MenuModal />
            {
                isLoading ? error.error.status !== StatusCodes.OK ? null : <Loader /> : null
            }
        </React.Fragment>
    )
}
