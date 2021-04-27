import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { getUniqId } from '../../helpers';
import ShipRow from '../ShipsRow/ShipRow';

import { Owners } from '../../store/area/interfaces';
import { RootStore } from '../../store/store';

import './Ships.scss';

interface ShipsProps {
    shipsOwner: Owners;
}

const Ships: FC<ShipsProps> = ({ shipsOwner }: ShipsProps) => {
    const { User } = Owners;
    const {
        user: { userShips },
        computer: { computerShips },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    return (
        <div className="ships">
            {(shipsOwner === User ? userShips : computerShips).map(ship => (
                <ShipRow key={getUniqId()} shipLength={ship} />
            ))}
        </div>
    );
};

export default Ships;
