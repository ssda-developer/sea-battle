import React, { FC, ReactNode } from 'react';

import { StyledAreaButtons } from './styles';

interface AreaButtonsProps {
    children: ReactNode;
}

const AreaButtons: FC<AreaButtonsProps> = ({ children }: AreaButtonsProps) => {
    return <StyledAreaButtons>{children}</StyledAreaButtons>;
};

export default AreaButtons;
