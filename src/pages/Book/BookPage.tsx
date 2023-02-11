import React from 'react';
import { useLocation } from 'react-router-dom';

import { IBookInfoMock } from '../../components/Card/types/types';
import { Feedbacks } from '../../components/Feedbacks/Feedbacks';
import { cardInfoMock } from '../../utils/CardsInfoMock';

import { ImgSlider } from './components/ImgSlider';

import './BookPage.scss';

export const BookPage = () => {
    const location = useLocation().pathname.split('/');
    const book: IBookInfoMock = cardInfoMock[+location[location.length - 1]];

    return (
        <React.Fragment>
            <section className="book__path">
                <div className="book__path__container">
                    {book.genre} / {book.title}
                </div>
            </section>
            <main className='book__container'>
                <div className="book__main-info">
                    <ImgSlider img={book.img}/>
                    <div className="main-info__block">
                        <h3 className="main-info__title">
                            {book.title}
                        </h3>
                        <h5 className="main-info__author">{book.author}</h5>
                        <button
                            type='button'
                            className={`main-info-book ${book.isBooked ? 'booked' : book.busyUntil ? 'busy' : 'book'}`}
                            disabled={book.isBooked ? true : book.busyUntil ? true : false}
                        >
                            {
                                book.isBooked ? 'Забронирована' : book.busyUntil ? `занята до ${book.busyUntil}` : 'Забронировать'
                            }
                        </button>

                        <article className='about-book__article'>
                            <h5 className="about-book__title">О книге</h5>
                            <p className="about-book__p">{book.about}</p>
                        </article>
                    </div>
                </div>
                <div className="book__additional-info">
                    <section className="rating__section">
                        <h5 className="rating__title">Рейтинг</h5>
                        <div className='rating__stars'>
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star" />
                            <span className='rating'>{book.rating ? book.rating : 'еще нет оценок'}</span>
                        </div>
                    </section>
                    <section className="detailed-info__section">
                        <h5 className="detailed-info__title">Подробная информация</h5>
                        <div className="detailed-info__table">
                            <table>
                                <tr>
                                    <td className='table-key'>Издательство</td>
                                    <td className='table-value'>{book.publishing}</td>
                                </tr>
                                <tr>
                                    <td className='table-key'>Год издания</td>
                                    <td className='table-value'>{book.year}</td>
                                </tr>
                                <tr>
                                    <td className='table-key'>Страниц</td>
                                    <td className='table-value'>{book.pages}</td>
                                </tr>
                                <tr>
                                    <td className='table-key'>Переплёт</td>
                                    <td className='table-value'>{book.binding}</td>
                                </tr>
                                <tr>
                                    <td className='table-key'>Формат</td>
                                    <td className='table-value'>{book.format}</td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td className='table-key'>Жанр</td>
                                    <td className='table-value'>{book.genre}</td>
                                </tr>
                                <tr>
                                    <td className='table-key'>Вес</td>
                                    <td className='table-value'>{book.weight}</td>
                                </tr>
                                <tr>
                                    <td className='table-key'>ISBN</td>
                                    <td className='table-value'>{book.ISBN}</td>
                                </tr>
                                <tr>
                                    <td className='table-key'>Изготовитель</td>
                                    <td className='table-value'>{book.manufacturer}</td>
                                </tr>
                                <tr>
                                    <td />
                                    <td />
                                </tr>
                            </table>
                        </div>

                    </section>
                    <section className="feedbacks__section">
                        <Feedbacks book={book} />
                        <button type='button' className='feedbacks__button' data-test-id='button-rating'>
                            Оценить книгу
                        </button>
                    </section>
                </div>
            </main >
        </React.Fragment >
    );
}
