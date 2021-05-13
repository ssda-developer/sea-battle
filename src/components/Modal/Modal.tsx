import React, { FC, ReactNode, useEffect, useRef, MouseEvent } from 'react';

import Portal from '../Portal';

import { StyledModal, StyledModalMessage } from './styles';

interface IModalProps {
    clickedOutside: () => void;
    children: ReactNode;
}

const Modal: FC<IModalProps> = ({ clickedOutside, children }: IModalProps) => {
    const backdrop = useRef(null);

    const handleKeyDown = ({ keyCode }: KeyboardEvent): void => {
        if (keyCode === 27) {
            clickedOutside();
        }
    };

    const handleClickOutside = ({ target }: MouseEvent<HTMLDivElement>): void => {
        if (backdrop.current === target) {
            clickedOutside();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <Portal>
            <StyledModal ref={backdrop} onClick={handleClickOutside}>
                <StyledModalMessage>{children}</StyledModalMessage>
            </StyledModal>
        </Portal>
    );
};

export default Modal;
