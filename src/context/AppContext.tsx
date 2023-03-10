import React, { createContext, useMemo, useState } from 'react';

import { CONSTANTS } from '../utils/constants';

interface IAppContext {
    isBurgerModalOpen: boolean,
    isNavModalOpen: boolean,
    isList: boolean,
    sortType: string,
    searchString: string,
    changeCardsView: (value: boolean) => void,
    changeSortType: () => void,
    changeSearchString: (value: string) => void,
    openModal: (type: string) => void,
    closeModal: (type: string) => void,
}

export const AppContext = createContext<IAppContext>({
    isBurgerModalOpen: false,
    isNavModalOpen: false,
    isList: false,
    sortType: 'descending',
    searchString: '',
    changeCardsView: () => { },
    changeSortType: () => { },
    changeSearchString: () => { },
    openModal: () => { },
    closeModal: () => { },
});

export const AppState = ({ children }: { children: React.ReactNode }) => {
    const [isList, setIsList] = useState(false);
    const [isBurgerModalOpen, setIsBurgerModalOpen] = useState(false);
    const [isNavModalOpen, setIsNavModalOpen] = useState(false);
    const [sortType, setSortType] = useState('descending');
    const [searchString, setSearchString] = useState('');


    const openModal = (type: string) => {
        switch (type) {
            case CONSTANTS.BURGER_MODAL:
                setIsBurgerModalOpen(true);
                // document.body.style.overflow = 'hidden';
                break
            case CONSTANTS.NAV_MODAL:
                setIsNavModalOpen(true)
                break
        }

    };

    const closeModal = (type: string) => {
        switch (type) {
            case CONSTANTS.BURGER_MODAL:
                setIsBurgerModalOpen(false);
                // document.body.style.overflow = 'visible';
                break
            case CONSTANTS.NAV_MODAL:
                setIsNavModalOpen(false)
                break
        }

    };

    const changeCardsView = (value: boolean) => {
        setIsList(value);
    };

    const changeSearchString = (value: string) => {
        setSearchString(value);
    };

    const changeSortType = () => {
        switch (sortType) {
            case 'descending':
                setSortType('ascending');
                break
            case 'ascending':
                setSortType('descending')
                break
        }
    };

    const contextValue = useMemo(() => ({
        isBurgerModalOpen,
        isNavModalOpen,
        isList,
        sortType,
        searchString,
        changeCardsView,
        changeSortType,
        changeSearchString,
        openModal,
        closeModal,
    }), [isList, isBurgerModalOpen, isNavModalOpen, sortType, searchString]);

    return (
        <AppContext.Provider value={contextValue}
        >
            {children}
        </AppContext.Provider>
    );
};
