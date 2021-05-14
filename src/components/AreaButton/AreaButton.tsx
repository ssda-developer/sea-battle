import React, { FC, MouseEvent, ReactElement } from 'react';

import { StyledAreaButton } from './styles';

interface IAreaButtonProps {
    icon: ReactElement;
    clicked: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AreaButton: FC<IAreaButtonProps> = ({ icon, clicked }: IAreaButtonProps) => {
    return <StyledAreaButton onClick={clicked}>{icon}</StyledAreaButton>;
};

export default AreaButton;
