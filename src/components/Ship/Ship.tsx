import React, { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { renderSquare } from '../../redux/Area/areaActions';
import { addShip } from '../../redux/Area/areaUtils';
import { RootStore } from '../../redux/store';

import './Ship.scss';

interface IShipProps {
    cellCount: number;
}

const Ship: FC<IShipProps> = ({ cellCount }: IShipProps) => {
    const dispatch = useDispatch();
    const areaState = useSelector((state: RootStore) => state.areaReducer);

    const addShipHandler = () => {
        console.log('click');
        // dispatch(renderSquare(addShip(areaState.square, id)));
    };

    return (
        <button type="button" className="ship__button" onClick={addShipHandler}>
            {[...Array(cellCount).keys()].map(partShip => (
                <div className="ship__button-cell" key={partShip} />
            ))}
        </button>
    );
};

export default Ship;
