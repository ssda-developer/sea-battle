import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import { Owners } from '../../store/area/interfaces';
import HintOptions from '../../constants/hintsConstants';
import BuildSquare from '../Square/BuildSquare/BuildSquare';
import Hints from '../Hints/Hints';
import { createSquare } from '../../utils/areaUtils';
import randomShipPlacement from '../../utils/randomShipPlacement';
import useActions from '../../hooks/useActions';
import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';
import { ReactComponent as SVGRandom } from '../../icons/random.svg';
import { ReactComponent as SVGTrash } from '../../icons/trash.svg';
import { ReactComponent as SVGQuestion } from '../../icons/question.svg';

import './Area.scss';

interface AreaProps {
    owner: Owners;
}

const Area: FC<AreaProps> = ({ owner }: AreaProps) => {
    const { renderFriendlySquare } = useActions();
    const { User, Computer } = Owners;
    const { owner: currentOwner } = useSelector(({ areaReducer }: RootStore) => areaReducer);
    const { gameStatus } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const userBuildRandomShipsHandler = () => {
        renderFriendlySquare(randomShipPlacement(createSquare()));
    };

    const userClearAreaHandler = () => {
        renderFriendlySquare(createSquare());
    };

    const buttons = () => {
        return (
            <div className="area__buttons">
                <button type="button" className="area__random-button" onClick={userBuildRandomShipsHandler}>
                    <SVGRandom />
                </button>
                <button type="button" className="area__random-button" onClick={userClearAreaHandler}>
                    <SVGTrash />
                </button>
                <button type="button" className="area__random-button">
                    <SVGQuestion />
                </button>
            </div>
        );
    };

    const areaClassNameDisabled =
        (owner === Computer && !gameStatus) || (owner === User && gameStatus) || currentOwner === Computer ? 'is-disabled' : '';

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
                <div className={`area__wrapper ${areaClassNameDisabled} ${owner.toLowerCase()}`}>
                    <BuildSquare playerAffiliation={owner} />
                </div>
            </div>
            {owner === User && <Hints hintText={HintOptions.PlayerShot} />}
        </div>
    );
};

export default Area;
