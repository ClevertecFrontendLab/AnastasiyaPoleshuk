import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../../context/AppContext';

import '../Menu.scss';

interface IProps {
    path: string,
    name: string,
    bookCount: string,
    dataTestIdValue: string,
}


export const MenuItem = (props: IProps) => {
    const { path, name, bookCount, dataTestIdValue } = props;
    const { closeModal } = useContext(AppContext);

    return (
        <NavLink
            to={`/books/${path}`}
            className="book-type__item"
            data-test-id={
                dataTestIdValue ?
                    `${dataTestIdValue}-books`
                    : null
            }
            onClick={closeModal}
        >
            {name}
            <span className='book-type__bookCount'>{bookCount}</span>
        </NavLink>
    )
}
