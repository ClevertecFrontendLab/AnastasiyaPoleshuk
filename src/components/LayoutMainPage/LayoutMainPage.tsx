import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AnyAction } from 'redux';

import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { IStore } from '../../types/storeTypes';
import { Loader } from '../Loader/Loader';
import { Menu } from '../NavigationMenu/Menu';

import './LayoutMainPage.scss';

export const LayoutMainPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: IStore) => state.categories.categories);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        dispatch(GetCategoriesThunk() as unknown as AnyAction);
        dispatch(GetBooksThunk() as unknown as AnyAction)
            .then(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <main className='main'>
            <div className='main__container'>
                {
                    isLoading && <Loader />
                }
                <div className="menu-wrapp">
                    {
                        categories.length > 0 ? <Menu isOpen={true} dataTestId='navigation' /> : null
                    }
                </div>
                <Outlet />
            </div>
        </main>
    )
}
