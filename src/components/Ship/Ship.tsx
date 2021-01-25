import React, { FC, MouseEvent } from 'react';

import { useDispatch } from 'react-redux';
import { updateCurrentShipId } from '../../redux/Ships/shipsActions';
import getUniqId from '../../helpers';

import './Ship.scss';

interface IShipProps {
    cellCount: number;
}

const Ship: FC<IShipProps> = ({ cellCount }: IShipProps) => {
    const dispatch = useDispatch();

    const addShipHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;

        dispatch(updateCurrentShipId(id));
    };

    return (
        <button id={`ship-${getUniqId()}`} type="button" className="ship__button" onClick={addShipHandler}>
            {[...Array(cellCount).keys()].map(partShip => (
                <div className="ship__button-cell" key={partShip} />
            ))}
        </button>
    );
};

export default Ship;
