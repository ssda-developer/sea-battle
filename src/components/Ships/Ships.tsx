import React, { FC } from 'react';

import Ship from '../Ship/Ship';

const Ships: FC = () => {
    const ships = [
        {
            name: 'four-deck',
            maxCount: 1,
            length: 4,
        },
        {
            name: 'three-deck',
            maxCount: 2,
            length: 3,
        },
        {
            name: 'double-deck',
            maxCount: 3,
            length: 2,
        },
        {
            name: 'one-deck',
            maxCount: 4,
            length: 1,
        },
    ];

    return (
        <div className="ships">
            {ships.map(ship => (
                <div key={ship.name}>
                    <p>
                        {ship.name} - x{ship.maxCount}
                    </p>
                    <Ship maxCount={ship.maxCount} length={ship.length} />
                </div>
            ))}
        </div>
    );
};

export default Ships;
