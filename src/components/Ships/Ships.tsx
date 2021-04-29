import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { getUniqId } from '../../helpers';
import ShipRow from '../ShipsRow/ShipRow';

import { Owners } from '../../interface/area';
import { RootStore } from '../../store';

import './Ships.scss';
import { SHIPS } from '../../constants';

interface ShipsProps {
    shipsOwner: Owners;
}

const Ships: FC<ShipsProps> = ({ shipsOwner }: ShipsProps) => {
    const { User } = Owners;
    const {
        user: { userShips },
        computer: { computerShips },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const shipsArray = shipsOwner === User ? userShips.slice() : computerShips.slice();

    const ships = [...SHIPS].map(ship => {
        const obj = {
            length: ship,
            isHas: !!shipsArray.find(fShips => fShips === ship),
        };
        if (obj.isHas) {
            shipsArray.splice(
                shipsArray.findIndex(elt => elt === ship),
                1,
            );
        }
        return obj;
    });

    return (
        <div className="ships">
            {ships.map(({ length, isHas }) => (
                <ShipRow key={getUniqId()} shipLength={length} shipHas={isHas} />
            ))}
        </div>
    );
};

export default Ships;
