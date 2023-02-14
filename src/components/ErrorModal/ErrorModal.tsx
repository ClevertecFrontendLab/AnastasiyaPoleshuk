import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IStore } from '../../types/storeTypes';

import './ErrorModal.scss';

export const ErrorModal = () => {
    const error = useSelector((state: IStore) => state.error.error);
    const [isOpen, setIsOpen] = useState(error.error.status !== 0);

    useEffect(() => {
        setIsOpen(!!error.error.name);
    }, [error.error.name])

    const clearError = () => {
        setIsOpen(!isOpen);

    }

    return (
        <div className={`error-modal__container ${isOpen ? 'error-modal__open' : null}`} data-test-id='error'>
            <h5 className="error__text">Что-то пошло не так. Обновите страницу через некоторое время.</h5>
            <span className="error__btn-close" onClick={clearError} />
        </div>
    )
}
