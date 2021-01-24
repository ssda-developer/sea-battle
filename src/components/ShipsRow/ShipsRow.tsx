import React, { FC } from 'react';

import Ship from '../Ship/Ship';

import './ShipsRow.scss';

interface IShipsRowProps {
    shipsCount: number;
    shipLength: number;
}

const ShipsRow: FC<IShipsRowProps> = ({ shipsCount, shipLength }: IShipsRowProps) => {
    return (
        <div className="ships__row ship">
            {[...Array(shipsCount).keys()].map(ship => (
                <Ship key={ship} cellCount={shipLength} />
            ))}
        </div>
    );
};

export default ShipsRow;
