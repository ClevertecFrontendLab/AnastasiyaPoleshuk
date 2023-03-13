import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

import './ModalWindow.scss';

interface IProps {
    children: React.ReactNode,
    type: string,
}

export const ModalWindow = ({ children, type }: IProps) => {
    const { closeModal } = useContext(AppContext);

    return (
        <section className="overlay" onClick={() => closeModal(type)}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                {children}
                <button type='button' className="modal-window__close-btn" onClick={() => closeModal(type)} />
            </div>
        </section>
    );

}
