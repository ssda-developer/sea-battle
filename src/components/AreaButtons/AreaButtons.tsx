import React, { FC } from 'react';

import './AreaButtons.scss';

type AreaButtonsProps = {
    children: JSX.Element | JSX.Element[];
};

const AreaButtons: FC<AreaButtonsProps> = ({ children }: AreaButtonsProps) => {
    return <div className="area__buttons">{children}</div>;
};

export default AreaButtons;
