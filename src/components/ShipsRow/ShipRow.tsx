import React, { FC } from 'react';

import Ship from '../Ship/Ship';

import { StyledShipRow } from './styles';

interface IShipRowProps {
    shipLength: number;
    shipHas: boolean;
}

const ShipRow: FC<IShipRowProps> = ({ shipLength, shipHas }: IShipRowProps) => {
    return (
        <StyledShipRow styledIsHas={shipHas}>
            <Ship cellCount={shipLength} />
        </StyledShipRow>
    );
};

export default ShipRow;
