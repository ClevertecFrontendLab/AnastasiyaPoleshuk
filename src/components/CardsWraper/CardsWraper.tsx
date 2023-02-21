import { useSelector } from 'react-redux';

import { IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { FilteredBooks } from '../../utils/FilteredBooks';
import { Card } from '../Card/Card';

import './CardsWraper.scss';

export const CardsWraper = (props: { category: string }) => {
    const books = useSelector((state: IStore) => state.books.books);
    const { category } = props;
    const FilteredBooksArr = FilteredBooks(books, category)

    return (
        <section className="cards-wraper">
            {
                FilteredBooksArr.length > 0 ?
                    FilteredBooksArr
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
