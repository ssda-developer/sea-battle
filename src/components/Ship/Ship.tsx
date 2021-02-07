import React, { FC } from 'react';

import './Ship.scss';

interface IShipProps {
    cellCount: number;
    id: string;
}

const Ship: FC<IShipProps> = ({ cellCount, id }: IShipProps) => {
    return (
        <div id={id} className="ship__button">
            {[...Array(cellCount).keys()].map(partShip => (
                <span className="ship__button-cell" key={partShip} />
            ))}
        </div>
    );
};

export default Ship;
