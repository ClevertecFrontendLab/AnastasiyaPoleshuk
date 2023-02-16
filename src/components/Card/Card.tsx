import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import altPath from '../../assets/icon_cat.png';
import { AppContext } from '../../context/AppContext';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

import './Card.scss';

export const Card = (props: { book: IGetBooks }) => {
    const { id, image, rating, title, authors, booking, delivery } = props.book;
    const book = useSelector((state: IStore) => state.books.book);
    const dispatch = useDispatch();
    const { isList } = useContext(AppContext);
    const navigate = useNavigate();
    const { category } = useParams();
    const bookCategory = category ? category : 'all';

    const changePage = () => {
        navigate(`/books/${bookCategory}/${id}`)
        book ? null  : dispatch(GetBookThunk(id) as unknown as AnyAction)
    };

    return (
        <div className={`${isList ? 'list-item' : 'card'}`} data-test-id='card' onClick={changePage}>
            {
                image ?
                    <img src={`${CONSTANTS.URL}${image.url}`} alt='фото книги' className={`${isList ? 'list-item__img' : 'card__img'}`} />
                    : <img src={altPath} alt='фото книги' className={`${isList ? 'list-item__img-alt' : 'card__img-alt'}`} />
            }
            <div className={`${isList ? 'list-item__info-box' : null}`}>
                {
                    rating ?
                        <div className={`${isList ? 'hide' : 'rating-stars'}`}>
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star" />
                        </div>
                        :
                        <p className={`${isList ? 'hide' : 'card__rating'}`}>нет оценок</p>
                }

                <h2 className={`${isList ? 'list-item__title' : 'card__title'}`}>{title}</h2>
                <h3 className={`${isList ? 'list-item__author' : 'card__author'}`}>{authors.join(' ')}</h3>
                <div className={`${isList ? 'list-item__button-block' : null}`}>
                    {
                        rating ?
                            <div className={`${isList ? null : 'hide'}`}>
                                <i className="star" />
                                <i className="star" />
                                <i className="star" />
                                <i className="star" />
                                <i className="star" />
                            </div>
                            :
                            <p className={`${isList ? 'list-item__rating' : 'hide'}`}>нет оценок</p>
                    }
                    <button
                        type='button'
                        className={
                            `${isList ? 'list-item__btn' : 'card__btn'} ${booking ? 'booked' : delivery ? 'busy' : null}`
                        }
                        disabled={booking ? true : delivery ? true : false}
                    >
                        {
                            booking ? 'Забронирована' : delivery ? `занята до ${delivery}` : 'Забронировать'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
