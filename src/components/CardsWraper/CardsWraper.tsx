import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { AppContext } from '../../context/AppContext';
import { IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { FilteredBooks } from '../../utils/FilteredBooks';
import { sortBooks } from '../../utils/SortBooks';
import { Card } from '../Card/Card';

import './CardsWraper.scss';

export const CardsWraper = (props: { category: string }) => {
    const books = useSelector((state: IStore) => state.books.books);
    const { category } = props;
    const { sortType } = useContext(AppContext);
    const FilteredBooksArr = FilteredBooks(books, category);
    const sortedBooksArr = sortBooks(FilteredBooksArr, sortType);

    return (
        <section className="cards-wraper">
            {
                sortedBooksArr.length > 0 ?
                    sortedBooksArr
                        .map((item: IGetBooks) => <Card
                            key={item.id}
                            book={item}
                        />)
                    :
                    <p className='alternate-text'>В этой категории книг ещё нет</p>
            }
        </section>
    )
}
