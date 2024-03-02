import React from 'react';

import './Modal.scss';

interface IProps {
    children: React.ReactNode;
}

export const ModalWindow = ({ children }: IProps) => {
    return (
        <section className='overlay' data-test-id='modal-outer'>
            <div className='modal-window' data-test-id='booking-modal'>
                {children}
            </div>
        </section>
    );
};
