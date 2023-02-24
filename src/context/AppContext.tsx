import React, { createContext, useMemo, useState } from 'react';

interface IAppContext {
    isModalOpen: boolean,
    isList: boolean,
    sortType: string,
    searchString: string,
    changeCardsView: (value: boolean) => void,
    changeSortType: () => void,
    changeSearchString: (value: string) => void,
    openModal: () => void,
    closeModal: () => void,
}

export const AppContext = createContext<IAppContext>({
    isModalOpen: false,
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortType, setSortType] = useState('descending');
    const [searchString, setSearchString] = useState('');


    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'visible';
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
        isModalOpen,
        isList,
        sortType,
        searchString,
        changeCardsView,
        changeSortType,
        changeSearchString,
        openModal,
        closeModal,
    }), [isList, isModalOpen, sortType, searchString]);

    return (
        <AppContext.Provider value={contextValue}
        >
            {children}
        </AppContext.Provider>
    );
};
