import React, { FC, MouseEvent, ReactElement } from 'react';

import './AreaButton.scss';

interface AreaButtonProps {
    icon: ReactElement;
    clicked: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AreaButton: FC<AreaButtonProps> = ({ icon, clicked }: AreaButtonProps) => {
    return (
        <button type="button" className="area__button" onClick={clicked}>
            {icon}
        </button>
    );
};

export default AreaButton;
