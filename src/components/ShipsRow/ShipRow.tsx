import React, { FC } from 'react';

import Ship from '../Ship/Ship';

import { getUniqId } from '../../helpers';

interface IShipRowProps {
    shipLength: number;
    shipHas: boolean;
}

const ShipRow: FC<IShipRowProps> = ({ shipLength, shipHas }: IShipRowProps) => {
    return (
        <div className={`ships__row ship ${shipHas ? 'is-has' : ''}`}>
            {[0].map(() => (
                <Ship key={getUniqId()} id={getUniqId()} cellCount={shipLength} />
            ))}
        </div>
    );
};

export default ShipRow;
