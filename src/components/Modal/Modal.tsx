import React, { FC, useEffect } from 'react';

import './Modal.scss';

type ModalProps = {
    changeModalStatus: (status: boolean) => void;
    children: JSX.Element;
};

const Modal: FC<ModalProps> = ({ changeModalStatus, children }: ModalProps) => {
    const handleKeyDown = ({ keyCode }: KeyboardEvent) => {
        if (keyCode === 27) {
            changeModalStatus(false);
        }
    };

    const handleClickOutside = ({ target }: MouseEvent) => {
        if ((target as HTMLElement).classList.contains('modal')) {
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
            <div className="modal__message">{children}</div>
        </div>
    );
};

export default Modal;
