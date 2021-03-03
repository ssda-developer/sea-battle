import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../store/store';
import { renderShips } from '../../store/ships/actions';
import { IShip } from '../../store/ships/interfaces';

import { SHIPS } from '../../constants/shipsConstants';
import { getUniqId } from '../../helpers';

import ShipsRow from '../ShipsRow/ShipsRow';

import './Ships.scss';

const Ships: FC = () => {
    const dispatch = useDispatch();
    const { ships } = useSelector((state: RootStore) => state.shipsReducer);

    const shipsArray: Array<Array<IShip>> = [];

    const createShips = () => {
        let shipsRow: Array<IShip> = [];

        // TODO: refactoring code, if you need it at all.
        [...SHIPS, ''].reduce((prValue, crValue) => {
            shipsRow.push({ id: getUniqId(), length: prValue as number });
            if (prValue !== crValue) {
                shipsArray.push(shipsRow);
                shipsRow = [];
            }
            return crValue;
        });

        return shipsArray;
    };

    useEffect(() => {
        dispatch(renderShips(createShips()));
    }, []);

    return (
        <div className="ships">
            {ships.map((shipRow: IShip[], idx: number) => (
                <ShipsRow key={shipRow[idx].id} shipRow={shipRow} />
            ))}
        </div>
    );
};

export default Ships;
