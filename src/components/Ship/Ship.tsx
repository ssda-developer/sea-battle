import React, { FC } from 'react';

import './Ship.scss';

interface IShipProps {
    cellCount: number;
}

const Ship: FC<IShipProps> = ({ cellCount }: IShipProps) => {
    return (
        <div className="ship__button">
            {[...Array(cellCount).keys()].map(partShip => (
                <span className="ship__button-cell" key={partShip} />
            ))}
        </div>
    );
};

export default Ship;
