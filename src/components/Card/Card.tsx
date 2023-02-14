import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import altPath from '../../assets/icon_cat.png';
import { AppContext } from '../../context/AppContext';
import { ErrorAction } from '../../store/actions/ErrorAction';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IError, IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

import './Card.scss';

export const Card = (props: { book: IGetBooks }) => {
    const { id, image, rating, title, authors, booking, delivery, categories } = props.book;
    const error = useSelector((state: IStore) => state.error.error);
    const { isList } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useParams();
    const bookCategory = category ? category : 'all';

    const changePage = () => {
        dispatch(ErrorAction({
            data: null,
            error: {
                status: 0,
                name: '',
                message: '',
                details: {}
            }
        } as IError)
        )
        error.error.name ? null : navigate(`/books/${bookCategory}/${id}`);
        // dispatch(GetBookThunk(id) as unknown as AnyAction)
        //     .then(() => {
        //
        //     })
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
