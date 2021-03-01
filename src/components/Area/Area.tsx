import React, { FC } from 'react';

import { IOwns } from '../../store/area/interfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import BuildSquare from '../Square/BuildSquare/BuildSquare';

import './Area.scss';

const Area: FC<IOwns> = (owns: IOwns) => {
    return (
        <div className="area">
            <div className="area__letters">
                {AREA_LETTERS.map(letter => (
                    <div className="field" key={letter}>
                        {letter.toLocaleUpperCase()}
                    </div>
                ))}
            </div>
            <div className="area__numbers">
                {AREA_NUMBERS.map(number => (
                    <div className="field" key={number}>
                        {number.toUpperCase()}
                    </div>
                ))}
            </div>
            <div className="area__wrapper">
                <BuildSquare playerAffiliation={owns} />
            </div>
        </div>
    );
};

export default Area;
