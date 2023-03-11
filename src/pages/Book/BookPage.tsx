import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { BookComponent } from '../../components/BookComponent/BookComponent';
import { ErrorModal } from '../../components/ErrorModal/ErrorModal';
import { Loader } from '../../components/Loader/Loader';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IStore } from '../../types/storeTypes';

export const BookPage = () => {
    const dispatch = useDispatch();
    const isLoadingState = useSelector((state: IStore) => state.isLoading.isLoading);
    const isErrorState = useSelector((state: IStore) => state.isError.isError);
    const book = useSelector((state: IStore) => state.books.book);
    const jwt = useSelector((state: IStore) => state.user.user.user.jwt);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const [isError, setIsError] = useState(isErrorState);
    const { bookId } = useParams();
    const { category } = useParams();
    const id = bookId ? +bookId : 2;


    useEffect(() => {
        dispatch(GetBookThunk({ id, jwt }) as unknown as AnyAction)
            .then(() => {
                setIsLoading(false);
            });
    }, [])

    useEffect(() => {
        setIsError(isErrorState);
    }, [isErrorState])

    return (
        <React.Fragment>
            <section className="book__path">
                <div className="book__path__container">
                    <NavLink
                        to={`/books/${category}`}
                        data-test-id='breadcrumbs-link'
                    >
                        {book ? category === 'all' ? 'Все книги' : book.categories.join('') : 'Программирование'}
                    </NavLink>
                    <span data-test-id='book-name'>
                        {book ? ` / ${book.title}` : ' / '}
                    </span>
                </div>
            </section>
            {
                isLoading ? <Loader /> : null
            }
            {
                isError ? isLoading ? null : <ErrorModal /> : null
            }
            {
                book ? isError ? null : <BookComponent book={book} /> : null
            }
        </React.Fragment>

    );
}
