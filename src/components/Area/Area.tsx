import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants';
import { Owners } from '../../enums';

import AreaAxes from '../AreaAxes';
import Field from '../Field';
import Ships from '../Ships/Ships';

import './Area.scss';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
    const { User, Computer } = Owners;

    const { gameStart, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const fieldClassNameDisabled =
        (areaOwner === User && gameStart) || (areaOwner === Computer && !gameStart) || currentPlayer === Computer ? 'is-disabled' : '';

    return (
        <div className={`area ${areaOwner.toLowerCase()}`}>
            <Ships shipsOwner={areaOwner} />
            <div className="area__container">
                <div className="area__letters">
                    <AreaAxes array={AREA_LETTERS} />
                </div>
                <div className="area__numbers">
                    <AreaAxes array={AREA_NUMBERS} />
                </div>
                <div className={`area__wrapper ${fieldClassNameDisabled} ${areaOwner.toLowerCase()}`}>
                    <Field fieldOwner={areaOwner} />
                </div>
            </div>
        </div>
    );
};

export default Area;
