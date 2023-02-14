import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ICategories } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';

import { MenuItem } from './components/MenuItem';

import './Menu.scss';

interface IProps {
    isOpen: boolean,
    dataTestId: string,
}

export const Menu = (props: IProps) => {
    const { isOpen, dataTestId } = props;
    const [toggleBookList, setToggleBookList] = useState(isOpen);
    const categories = useSelector((state: IStore) => state.categories.categories);

    return (
        <aside className="menu">
            <nav className="menu__wrapp">
                <ul className="menu__list">
                    <li className="menu__item book-type">
                        <details open={toggleBookList} className='book-type__wrap'>
                            <summary className='book-type__title' data-test-id={`${dataTestId}-showcase`}>
                                Витрина книг
                            </summary>
                            <MenuItem key={-1} path='all' name='Все книги' bookCount='157' dataTestIdValue={dataTestId} />
                            {
                                categories ?
                                    categories.map((item: ICategories) => <MenuItem key={item.id} path={item.path} name={item.name} bookCount="12" dataTestIdValue='' />)
                                : <p>null</p>
                            }
                        </details>
                    </li>
                    <li className="menu__item" onClick={() => setToggleBookList(false)}>
                        <NavLink to="terms" data-test-id={`${dataTestId}-terms`}>
                            Правила пользования
                        </NavLink>
                    </li>
                    <li className="menu__item" onClick={() => setToggleBookList(false)}>
                        <NavLink to="contract" data-test-id={`${dataTestId}-contract`}>
                            Договор оферты
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
