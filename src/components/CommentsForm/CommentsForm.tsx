import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { CreateCommentsThunk } from '../../store/thunks/CreateCommentsThunk';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

import './CommentsForm.scss';

export const CommentsForm = () => {
    const dispatch = useDispatch();
    const book = useSelector((state: IStore) => state.books.book);
    const user = useSelector((state: IStore) => state.user.user.user);
    const jwt = useSelector((state: IStore) => state.user.user.jwt);
    const { closeModal } = useContext(AppContext);
    const [comment, setComment] = useState('');
    const { bookId } = useParams();
    const id = bookId ? +bookId : 2;

    const onSubmit = () => {
        dispatch(CreateCommentsThunk({
            data: {
                rating: 3,
                text: comment,
                book: `${book.id}`,
                user: `${user.id}`
            }
        }) as unknown as AnyAction)
        .then(() => {
            closeModal(CONSTANTS.COMMENT_MODAL);
            dispatch(GetBookThunk({ id, jwt }) as unknown as AnyAction);
        })
    }

    return (
        <div className='comments__box'>
            <h3 className="comments__title">Оцените книгу</h3>

            <div className="rating__box">
                <h4 className="rating__title">Ваша оценка</h4>
            </div>

            <textarea className='comments__textarea' onChange={(e) => setComment(e.target.value)} placeholder='Оставить отзыв' />

            <button type="submit" className='comments__btn' onClick={() => onSubmit()}>оценить</button>
        </div>
    )
}
