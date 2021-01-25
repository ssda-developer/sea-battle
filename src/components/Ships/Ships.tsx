import React, { FC } from 'react';

import SHIPS from '../../constants/shipsConstants';

import ShipsRow from '../ShipsRow/ShipsRow';

import './Ships.scss';

const Ships: FC = () => {
    return (
        <div className="ships">
            {SHIPS.map(ship => (
                <ShipsRow key={ship.name} shipsCount={ship.maxCount} shipLength={ship.length} />
            ))}
        </div>
    );
};

export default Ships;
