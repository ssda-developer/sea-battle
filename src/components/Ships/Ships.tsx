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

    const createShips = () => {
        return SHIPS.reduce((shipsRow: IShip[][], length, idx, array) => {
            if (!idx || array[idx - 1] !== length) {
                shipsRow.push([]);
            }
            shipsRow[shipsRow.length - 1].push({ id: getUniqId(), length });
            return shipsRow;
        }, []);
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
