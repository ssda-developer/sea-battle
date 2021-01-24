import React, { FC, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../redux/store';
import initialShips from '../../redux/Ships/shipsUtils';

import SHIPS from '../../constants/shipsConstants';

import ShipsRow from '../ShipsRow/ShipsRow';

import './Ships.scss';

const Ships: FC = () => {
    // const dispatch = useDispatch();
    // const shipsState = useSelector((state: RootStore) => state.shipsReducer);

    const buildingShip = (evn: MouseEvent<HTMLButtonElement>) => {
        console.log('buildingShip');
    };

    // const renderShips = () => {};

    return (
        <div className="ships">
            {SHIPS.map(ship => (
                <ShipsRow key={ship.name} shipsCount={ship.maxCount} shipLength={ship.length} />
                // <Ship length={ship.length} count={ship.maxCount} />
                // <button type="button" key={ship.name} onClick={buildingShip}>
                //     <Ship length={ship.length} count={ship.maxCount} />
                // </button>
            ))}
        </div>
    );
};

export default Ships;
