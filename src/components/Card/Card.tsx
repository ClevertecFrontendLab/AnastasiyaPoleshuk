import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import path from '../../assets/book.png';
import altPath from '../../assets/icon_cat.png';
import { AppContext } from '../../context/AppContext';

import { ICardInfoMock } from './types/types';

import './Card.scss';


export const Card = (props: ICardInfoMock) => {
    const { id, img, rating, title, author, isBooked, busyUntil, category } = props;
    const { isList } = useContext(AppContext);
    const navigate = useNavigate();

    const changePage = () => {
        navigate(`/books/${category}/${id}`)
    };

    return (
        <div className={`${isList ? 'list-item' : 'card'}`} data-test-id='card' onClick={changePage}>
            {
                img.length > 0 ?
                    <img src={path} alt='фото книги' className={`${isList ? 'list-item__img' : 'card__img'}`} />
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
                <h3 className={`${isList ? 'list-item__author' : 'card__author'}`}>{author}</h3>
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
                            `${isList ? 'list-item__btn' : 'card__btn'} ${isBooked ? 'booked' : busyUntil ? 'busy' : null}`
                        }
                        disabled={isBooked ? true : busyUntil ? true : false}
                    >
                        {
                            isBooked ? 'Забронирована' : busyUntil ? `занята до ${busyUntil}` : 'Забронировать'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
