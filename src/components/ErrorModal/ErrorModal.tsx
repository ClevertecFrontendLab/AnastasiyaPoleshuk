import { useDispatch } from 'react-redux';

import { isErrorAction } from '../../store/actions/ErrorAction';

import './ErrorModal.scss';

export const ErrorModal = () => {
    const dispatch = useDispatch();

    const clearError = () => {
        dispatch(isErrorAction(false))
    }

    return (
        <div className='error-modal__container' data-test-id='error'>
            <h5 className="error__text">Что-то пошло не так. Обновите страницу через некоторое время.</h5>
            <span className="error__btn-close" onClick={clearError} />
        </div>
    )
}
