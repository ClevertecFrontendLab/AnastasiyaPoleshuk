import { useSelector } from 'react-redux';

import { CardsWraper } from '../../components/CardsWraper/CardsWraper';
import { Navigation } from '../../components/Navigation/Navigation';
import { IStore } from '../../types/storeTypes';

import './MainPage.scss';

export const MainPage = () => {
    const books = useSelector((state: IStore) => state.books.books);

    return (
        <section className="content-wrap">
            <Navigation />
            {
                books.length > 0 ? <CardsWraper /> : null
            }
        </section>
    )
}
