import React, { FC, useEffect } from 'react';

import { StyledModal, StyledModalMessage } from './styles';

interface IModalProps {
    clickedOutside: () => void;
    children: JSX.Element;
}

const Modal: FC<IModalProps> = ({ clickedOutside, children }: IModalProps) => {
    const handleKeyDown = ({ keyCode }: KeyboardEvent): void => {
        if (keyCode === 27) {
            clickedOutside();
        }
    };

    const handleClickOutside = ({ target }: MouseEvent): void => {
        if ((target as HTMLElement).classList.contains('modal')) {
            clickedOutside();
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
        <StyledModal className="modal">
            <StyledModalMessage>{children}</StyledModalMessage>
        </StyledModal>
    );
};

export default Modal;
