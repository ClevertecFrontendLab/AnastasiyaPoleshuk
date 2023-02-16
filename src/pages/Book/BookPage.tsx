import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { BookComponent } from '../../components/BookComponent/BookComponent';
import { LoadingAction } from '../../store/actions/LoadingAction';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IStore } from '../../types/storeTypes';

export const BookPage = () => {
    const book = useSelector((state: IStore) => state.books.book);
    const dispatch = useDispatch();
    const { bookId } = useParams();
    const id = bookId ? +bookId : 2;

    useEffect(() => {
        dispatch(GetBookThunk(id) as unknown as AnyAction)
            .then(() => dispatch(LoadingAction(false)))
    }, [])

    return (
        <div>
            {
                book ? <BookComponent book={book} /> : null
            }
        </div>

    );
}
