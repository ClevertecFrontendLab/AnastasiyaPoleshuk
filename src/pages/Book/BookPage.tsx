import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { BookComponent } from '../../components/BookComponent/BookComponent';
import { Loader } from '../../components/Loader/Loader';
import { ErrorAction } from '../../store/actions/ErrorAction';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IError } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';

export const BookPage = () => {
    const book = useSelector((state: IStore) => state.books.book);
    const error = useSelector((state: IStore) => state.error.error);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bookId } = useParams();
    const id = bookId ? +bookId : 2;

    useEffect(() => {
        dispatch(GetBookThunk(id) as unknown as AnyAction);
    }, [])

    useEffect(() => {
        error.error.name ? navigate('/books/all') : null;
    }, [error.error.name])

    return (
        <div>
            {
                book ? <BookComponent book={book} /> : error.error.name ? null : <Loader />
            }
        </div>

    );
}
