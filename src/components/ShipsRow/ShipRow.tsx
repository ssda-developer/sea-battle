import React, { FC } from 'react';

import Ship from '../Ship/Ship';

import { getUniqId } from '../../helpers';

interface IShipRowProps {
    shipLength: number;
}

const ShipRow: FC<IShipRowProps> = ({ shipLength }: IShipRowProps) => {
    return (
        <div className="ships__row ship">
            {[0].map(() => (
                <Ship key={getUniqId()} id={getUniqId()} cellCount={shipLength} />
            ))}
        </div>
    );
};

export default ShipRow;
