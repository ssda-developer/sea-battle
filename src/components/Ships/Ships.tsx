import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { SHIPS } from '../../constants';
import { Owners } from '../../enums';
import { getUniqId } from '../../helpers';

import ShipRow from '../ShipsRow/ShipRow';

import { StyledShips } from './styles';

interface IShipsProps {
    shipsOwner: Owners;
}

const Ships: FC<IShipsProps> = ({ shipsOwner }: IShipsProps) => {
    const { User } = Owners;

    const {
        user: { userShips },
        computer: { computerShips },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const shipsArray = (shipsOwner === User ? userShips : computerShips).slice();

    const ships = [...SHIPS].map(ship => {
        const temp = {
            length: ship,
            isHas: !!shipsArray.find(currentShip => currentShip === ship),
        };

        if (temp.isHas) {
            shipsArray.splice(
                shipsArray.findIndex(currentShip => currentShip === ship),
                1,
            );
        }

        return temp;
    });

    return (
        <StyledShips styledOwner={shipsOwner}>
            {ships.map(({ length, isHas }) => (
                <ShipRow key={getUniqId()} shipLength={length} shipHas={isHas} />
            ))}
        </StyledShips>
    );
};

export default Ships;
