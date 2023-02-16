import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorAction } from '../../store/actions/ErrorAction';
import { IError } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';

import './ErrorModal.scss';

export const ErrorModal = () => {
    const error = useSelector((state: IStore) => state.error.error);
    const [isOpen, setIsOpen] = useState(error.error.status !== 0);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsOpen(!!error.error.name);
    }, [error.error.name])

    const clearError = () => {
        dispatch(ErrorAction({
            data: null,
            error: {
                status: 200,
                name: '',
                message: '',
                details: {}
            }
        } as IError))
    }

    return (
        <div className='error-modal__container' data-test-id='error'>
            <h5 className="error__text">Что-то пошло не так. Обновите страницу через некоторое время.</h5>
            <span className="error__btn-close" onClick={clearError} />
        </div>
    )
}
