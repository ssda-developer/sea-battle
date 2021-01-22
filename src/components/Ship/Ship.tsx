import React, { FC } from 'react';

import './Ship.scss';

interface IShipProps {
    length: number;
    maxCount: number;
}

const Ship: FC<IShipProps> = ({ length, maxCount }: IShipProps) => {
    const array = [];
    for (let i = 0; i < length; i += 1) {
        array.push('part of the ship');
    }

    return (
        <div className="ship">
            {array.map(partShip => (
                <div className="field" key={partShip} />
            ))}
        </div>
    );
};

export default Ship;
