import React, { FC, useEffect } from 'react';

import Rules from '../Rules/Rules';

import './Modal.scss';

type ModalProps = {
    changeModalStatus: (status: boolean) => void;
};

const Modal: FC<ModalProps> = ({ changeModalStatus }: ModalProps) => {
    const handleKeyDown = ({ keyCode }: KeyboardEvent) => {
        if (keyCode === 27) {
            changeModalStatus(false);
        }
    };

    const handleClickOutside = ({ target }: any) => {
        if (target.classList.contains('modal')) {
            changeModalStatus(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="modal">
            <Rules />
        </div>
    );
};

export default Modal;
