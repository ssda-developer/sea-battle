import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../redux/store';

import SHIPS from '../../constants/shipsConstants';

import ShipsRow from '../ShipsRow/ShipsRow';

import './Ships.scss';

const Ships: FC = () => {
    const dispatch = useDispatch();
    const { ships } = useSelector((state: RootStore) => state.shipsReducer);

    useEffect(() => {
        console.log(ships);
    }, [ships]);

    return (
        <div className="ships">
            {SHIPS.map(ship => (
                <ShipsRow key={ship.name} shipsCount={ship.maxCount} shipLength={ship.length} />
            ))}
        </div>
    );
};

export default Ships;
