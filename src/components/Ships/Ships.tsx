import React, { FC } from 'react';

import Ship from '../Ship/Ship';

const Ships: FC = () => {
    const ships = [
        {
            name: 'fourdeck',
            maxCount: 1,
            length: 4,
        },
        {
            name: 'threedeck',
            maxCount: 2,
            length: 3,
        },
        {
            name: 'doubledeck',
            maxCount: 3,
            length: 2,
        },
        {
            name: 'singledeck',
            maxCount: 4,
            length: 1,
        },
    ];

    const buildingShip = () => {
        console.log('buildingShip');
    };

    return (
        <div className="ships">
            {ships.map(ship => (
                <button type="button" key={ship.name} onClick={buildingShip}>
                    <p>{ship.name}</p>
                    {/* <Ship length={ship.length} /> */}
                </button>
            ))}
        </div>
    );
};

export default Ships;
