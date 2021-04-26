import React, { FC, ReactNode } from 'react';

import './AreaButtons.scss';

type AreaButtonsProps = {
    children: ReactNode;
};

const AreaButtons: FC<AreaButtonsProps> = ({ children }: AreaButtonsProps) => {
    return <div className="area__buttons">{children}</div>;
};

export default AreaButtons;
