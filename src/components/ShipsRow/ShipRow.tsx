import React, { FC } from 'react';

import { getClassNames } from '../../helpers';

import Ship from '../Ship/Ship';

interface IShipRowProps {
    shipLength: number;
    shipHas: boolean;
}

const ShipRow: FC<IShipRowProps> = ({ shipLength, shipHas }: IShipRowProps) => {
    return (
        <div className={`ships__row ship ${getClassNames({ 'is-has': shipHas })}`}>
            <Ship cellCount={shipLength} />
        </div>
    );
};

export default ShipRow;
