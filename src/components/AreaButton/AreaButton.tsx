import React, { FC, MouseEvent, ReactElement } from 'react';

import './AreaButton.scss';

type AreaButtonProps = {
    icon: ReactElement;
    userClickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
};

const AreaButton: FC<AreaButtonProps> = ({ icon, userClickHandler }: AreaButtonProps) => {
    return (
        <button type="button" className="area__button" onClick={userClickHandler}>
            {icon}
        </button>
    );
};

export default AreaButton;
