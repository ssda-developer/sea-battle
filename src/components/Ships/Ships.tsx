import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../redux/store';
import { renderShips } from '../../redux/Ships/shipsActions';

import SHIPS from '../../constants/shipsConstants';

import ShipsRow from '../ShipsRow/ShipsRow';

import './Ships.scss';
import getUniqId from '../../helpers';
import { IShip } from '../../redux/Ships/shipsInterfaces';

const Ships: FC = () => {
    const dispatch = useDispatch();
    const { ships } = useSelector((state: RootStore) => state.shipsReducer);

    const shipsArray: Array<Array<IShip>> = [];

    const createShips = () => {
        SHIPS.forEach(ship => {
            const shipsRow: Array<IShip> = [];

            [...Array(ship.maxCount).keys()].forEach(() => {
                shipsRow.push({
                    id: getUniqId(),
                    length: ship.length,
                });
            });

            shipsArray.push(shipsRow);
        });

        return shipsArray;
    };

    useEffect(() => {
        dispatch(renderShips(createShips()));
    }, []);

    return (
        <>
            <div className="ships">
                {ships.map((shipRow: IShip[], idx: number) => (
                    <ShipsRow key={shipRow[idx].id} shipRow={shipRow} />
                ))}
            </div>
        </>
    );
};

export default Ships;
