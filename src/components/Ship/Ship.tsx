import React, { FC } from 'react';

import './Ship.scss';

interface IShipProps {
    cellCount: number;
}

const Ship: FC<IShipProps> = ({ cellCount }: IShipProps) => {
    return (
        <button type="button" className="ship__button">
            {[...Array(cellCount).keys()].map(partShip => (
                <div className="ship__button-cell" key={partShip} />
            ))}
        </button>
    );
};

export default Ship;
