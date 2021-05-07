import React, { FC, MouseEvent, ReactElement } from 'react';

import { StyledAreaButton } from './styles';

interface AreaButtonProps {
    icon: ReactElement;
    clicked: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AreaButton: FC<AreaButtonProps> = ({ icon, clicked }: AreaButtonProps) => {
    return <StyledAreaButton onClick={clicked}>{icon}</StyledAreaButton>;
};

export default AreaButton;
