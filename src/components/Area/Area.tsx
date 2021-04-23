import React, { FC } from 'react';

import { Owners } from '../../store/area/interfaces';

import HintOptions from '../../constants/hintsConstants';
import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import BuildSquare from '../Square/BuildSquare/BuildSquare';
import Hints from '../Hints/Hints';

import './Area.scss';

interface AreaProps {
    owner: Owners;
}

const Area: FC<AreaProps> = ({ owner }: AreaProps) => {
    const { User } = Owners;
    return (
        <div className="area">
            <div className="area__container">
                <button type="button" className="area__random-button">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="M505 359l-80-80c-15-15-41-4.47-41 17v40h-32l-52.78-56.55-53.33 57.14 70.55 75.6a12 12 0 0 0 8.77 3.81H384v40c0 21.46 26 32 41 17l80-80a24 24 0 0 0 0-34zM122.79 96H12a12 12 0 0 0-12 12v56a12 12 0 0 0 12 12h84l52.78 56.55 53.33-57.14-70.55-75.6a12 12 0 0 0-8.77-3.81z" />
                            <path d="M505 119a24 24 0 0 1 0 34l-80 80c-15 15-41 4.48-41-17v-40h-32L131.56 412.19a12 12 0 0 1-8.77 3.81H12a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h84L316.44 99.81a12 12 0 0 1 8.78-3.81H384V56c0-21.44 25.94-32 41-17z" />
                        </g>
                    </svg>
                </button>
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
                    <BuildSquare playerAffiliation={owner} />
                </div>
            </div>
            {owner === User && <Hints hintText={HintOptions.PlayerShot} />}
        </div>
    );
};

export default Area;
