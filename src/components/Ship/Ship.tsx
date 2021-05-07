import React, { FC } from 'react';

import { StyledShip, StyledShipCell } from './styles';

interface IShipProps {
    cellCount: number;
}

const Ship: FC<IShipProps> = ({ cellCount }: IShipProps) => {
    return (
        <StyledShip>
            {[...Array(cellCount).keys()].map(partShip => (
                <StyledShipCell key={partShip} />
            ))}
        </StyledShip>
    );
};

export default Ship;
