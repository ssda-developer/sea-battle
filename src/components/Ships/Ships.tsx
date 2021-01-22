import React, { FC } from 'react';

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
                // eslint-disable-next-line react/jsx-key
                <div key={ship.maxCount}>{ship.name}</div>
            ))}
        </div>
    );
};

export default Ships;
