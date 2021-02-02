import React, { FC, MouseEvent } from 'react';

import getUniqId from '../../helpers';

import './Ship.scss';

interface IShipProps {
    cellCount: number;
}

const Ship: FC<IShipProps> = ({ cellCount }: IShipProps) => {
    return (
        <div id={`ship-${getUniqId()}`} className="ship__button">
            {[...Array(cellCount).keys()].map(partShip => (
                <div className="ship__button-cell" key={partShip} />
            ))}
        </div>
    );
};

export default Ship;
