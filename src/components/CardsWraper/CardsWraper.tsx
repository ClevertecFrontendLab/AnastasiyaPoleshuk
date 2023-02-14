import { useSelector } from 'react-redux';

import { IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { Card } from '../Card/Card';

import './CardsWraper.scss';

export const CardsWraper = () => {
    const books = useSelector((state: IStore) => state.books.books);

    return (
        <section className="cards-wraper">
            {
                books.map((item: IGetBooks) => <Card
                    key={item.id}
                    book={item}
                />)
            }
        </section>
    )
}
