import React, { FC } from 'react';

import Ship from '../Ship/Ship';

import { IShip } from '../../redux/Ships/shipsInterfaces';

import './ShipsRow.scss';

interface IShipsRowProps {
    shipRow: Array<IShip>;
}

const ShipsRow: FC<IShipsRowProps> = ({ shipRow }: IShipsRowProps) => {
    return (
        <div className="ships__row ship">
            {shipRow.map(({ id, length }) => (
                <Ship key={id} id={id} cellCount={length} />
            ))}
        </div>
    );
};

export default ShipsRow;
