import { useSelector } from 'react-redux';

import { CardsWraper } from '../../components/CardsWraper/CardsWraper';
import { Navigation } from '../../components/Navigation/Navigation';
import { IStore } from '../../types/storeTypes';

import './MainPage.scss';

export const MainPage = () => {
    const books = useSelector((state: IStore) => state.books.books);
    const error = useSelector((state: IStore) => state.error.error);

    return (
        <section className="content-wrap">
            {
                error.error.message ? null : <Navigation />
            }
            {
                books.length > 0 ? <CardsWraper category='' /> :  null
            }
        </section>
    )
}
