import React, { createContext, useMemo, useState } from 'react';

interface IAppContext {
    isModalOpen: boolean,
    isList: boolean,
    changeCardsView: (value: boolean) => void,
    openModal: () => void,
    closeModal: () => void,
}

export const AppContext = createContext<IAppContext>({
    isModalOpen: false,
    isList: false,
    changeCardsView: () => { },
    openModal: () => { },
    closeModal: () => { },
});

export const AppState = ({ children }: { children: React.ReactNode }) => {
    const [isList, setIsList] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


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

    const contextValue = useMemo(() => ({
        isModalOpen,
        isList,
        changeCardsView,
        openModal,
        closeModal,
    }), [isList, isModalOpen]);

    return (
        <AppContext.Provider value={contextValue}
        >
            {children}
        </AppContext.Provider>
    );
};
