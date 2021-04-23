import React, { FC, useState } from 'react';
import { ReactComponent as SVGRandom } from '../../icons/random.svg';
import { ReactComponent as SVGTrash } from '../../icons/trash.svg';
import { ReactComponent as SVGQuestion } from '../../icons/question.svg';
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

    const buttons = () => {
        return (
            <div className="area__buttons">
                <button type="button" className="area__random-button">
                    <SVGRandom />
                </button>
                <button type="button" className="area__random-button">
                    <SVGTrash />
                </button>
                <button type="button" className="area__random-button">
                    <SVGQuestion />
                </button>
            </div>
        );
    };

    return (
        <div className="area">
            <div className="area__container">
                {owner === User && buttons()}
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
