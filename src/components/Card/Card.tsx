/* eslint-disable complexity */
import { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import altPath from '../../assets/icon_cat.png';
import { AppContext } from '../../context/AppContext';
import { IGetBooks } from '../../types/apiTypes';
import { CONSTANTS } from '../../utils/constants';

import { Hightlight } from './components/Hightlight';

import './Card.scss';



export const Card = (props: { book: IGetBooks }) => {
    const { id, image, rating, title, authors, booking, delivery } = props.book;
    const ratingNum = Math.floor(+rating);
    const { isList, searchString } = useContext(AppContext);
    const navigate = useNavigate();
    const { category } = useParams();
    const bookCategory = category ? category : 'all';
    const light = useCallback((str: string) => Hightlight(searchString, str), [searchString])

    const changePage = () => {
        navigate(`/books/${bookCategory}/${id}`)
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
                    ratingNum ?
                        <div className={`${isList ? 'hide' : 'rating-stars'}`}>
                            <i className="star-fill" />
                            <i className={`star${ratingNum - 1 > 0 ? '-fill' : ''}`} />
                            <i className={`star${ratingNum - 2 > 0 ? '-fill' : ''}`} />
                            <i className={`star${ratingNum - 3 > 0 ? '-fill' : ''}`} />
                            <i className={`star${ratingNum - 4 > 0 ? '-fill' : ''}`} />
                        </div>
                        :
                        <p className={`${isList ? 'hide' : 'card__rating'}`}>нет оценок</p>
                }
                <h2 className={`${isList ? 'list-item__title' : 'card__title'}`}>{light(title)}</h2>
                <h3 className={`${isList ? 'list-item__author' : 'card__author'}`}>{authors.join(' ')}</h3>
                <div className={`${isList ? 'list-item__button-block' : null}`}>
                    {
                        ratingNum ?
                            <div className={`${isList ? null : 'hide'}`}>
                                <i className="star-fill" />
                                <i className={`star${ratingNum - 1 > 0 ? '-fill' : ''}`} />
                                <i className={`star${ratingNum - 2 > 0 ? '-fill' : ''}`} />
                                <i className={`star${ratingNum - 3 > 0 ? '-fill' : ''}`} />
                                <i className={`star${ratingNum - 4 > 0 ? '-fill' : ''}`} />
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
