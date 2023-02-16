import { useSelector } from 'react-redux';

import { BookComponent } from '../../components/BookComponent/BookComponent';
import { IStore } from '../../types/storeTypes';

export const BookPage = () => {
    const book = useSelector((state: IStore) => state.books.book);

    return (
        <div>
            {
                book ?  <BookComponent book={book} /> : null
            }
        </div>

    );
}
