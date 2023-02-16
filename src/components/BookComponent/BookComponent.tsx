import { IGetBook } from '../../types/apiTypes';
import { Feedbacks } from '../Feedbacks/Feedbacks';
import { ImgSlider } from '../ImgSlider/ImgSlider';

import './BookComponent.scss';

export const BookComponent = ({ book }: { book: IGetBook }) => (
        <main className='book__container'>
            <div className="book__main-info">
                <ImgSlider img={book.images} />
                <div className="main-info__block">
                    <h3 className="main-info__title">
                        {book.title}
                    </h3>
                    <h5 className="main-info__author">{book.authors.join(' ')}</h5>
                    <button
                        type='button'
                        className={`main-info-book ${book.booking ? 'booked' : book.delivery ? 'busy' : 'book'}`}
                        disabled={book.booking ? true : book.delivery ? true : false}
                    >
                        {
                            book.booking ? 'Забронирована' : book.delivery ? `занята до ${book.delivery.dateHandedTo}` : 'Забронировать'
                        }
                    </button>

                    <article className='about-book__article'>
                        <h5 className="about-book__title">О книге</h5>
                        <p className="about-book__p">{book.description}</p>
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
                                <td className='table-value'>{book.publish}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Год издания</td>
                                <td className='table-value'>{book.issueYear}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Страниц</td>
                                <td className='table-value'>{book.pages}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Переплёт</td>
                                <td className='table-value'>{book.cover}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Формат</td>
                                <td className='table-value'>{book.format}</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td className='table-key'>Жанр</td>
                                <td className='table-value'>{book.categories.join(' ')}</td>
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
                                <td className='table-value'>{book.producer}</td>
                            </tr>
                            <tr>
                                <td />
                                <td />
                            </tr>
                        </table>
                    </div>

                </section>
                <section className="feedbacks__section">
                    <Feedbacks comments={book.comments} />
                    <button type='button' className='feedbacks__button' data-test-id='button-rating'>
                        Оценить книгу
                    </button>
                </section>
            </div>
        </main >
)
