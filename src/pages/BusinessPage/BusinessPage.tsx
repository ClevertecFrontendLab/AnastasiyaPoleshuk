import { useSelector } from 'react-redux';

import { CardsWraper } from '../../components/CardsWraper/CardsWraper';
import { Navigation } from '../../components/Navigation/Navigation';
import { IStore } from '../../types/storeTypes';

export const BusinessPage = () => {
    const books = useSelector((state: IStore) => state.books.books);
    const error = useSelector((state: IStore) => state.error.error);

    return (
        <section className="content-wrap">
            {
                error.error.message ? null : <Navigation />
            }
            {
                books.length > 0 ? <CardsWraper category='Бизнес' /> : null
            }
        </section>
    )
}
