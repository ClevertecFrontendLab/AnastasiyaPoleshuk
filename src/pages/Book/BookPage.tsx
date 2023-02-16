import React from 'react';
import { useSelector } from 'react-redux';

import { BookComponent } from '../../components/BookComponent/BookComponent';
import { IStore } from '../../types/storeTypes';

export const BookPage = () => {
    const book = useSelector((state: IStore) => state.books.book);

    return (
        <React.Fragment>
            <section className="book__path">
                <div className="book__path__container">
                    {book ? book.categories.join(' ') : 'Бизнес'} / {book ? book.title : ''}
                </div>
            </section>
            {
                book ?  <BookComponent book={book} /> : null
            }
        </React.Fragment>

    );
}
