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
                <>
                    <p>
                        {ship.name} - x{ship.maxCount}
                    </p>
                    <Ship key={ship.length} maxCount={ship.maxCount} length={ship.length} />
                </>
            ))}
        </div>
    );
};

export default Ships;
