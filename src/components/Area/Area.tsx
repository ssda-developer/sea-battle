import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Loop, DeleteOutline, HelpOutline } from '@material-ui/icons';

import { RootStore } from '../../store/store';
import useActions from '../../hooks/useActions';
import { Owners } from '../../store/area/interfaces';
import HintOptions from '../../constants/hintsConstants';
import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import randomShipPlacement from '../../utils/randomShipPlacement';
import { resetShipsValues } from '../../utils/customShipPlacement';
import { createSquare } from '../../utils/areaUtils';

import BuildSquare from '../Square/BuildSquare/BuildSquare';
import Hints from '../Hints/Hints';
import AreaButtons from '../AreaButtons/AreaButtons';
import AreaButton from '../AreaButtons/AreaButton/AreaButton';

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
        resetShipsValues();
    };

    const areaClassNameDisabled =
        (owner === Computer && !gameStatus) || (owner === User && gameStatus) || currentOwner === Computer ? 'is-disabled' : '';

    return (
        <div className="area">
            <div className="area__container">
                {owner === User && (
                    <AreaButtons>
                        <AreaButton userClickHandler={userBuildRandomShipsHandler} icon={<Loop />} />
                        <AreaButton userClickHandler={userClearAreaHandler} icon={<DeleteOutline />} />
                        <AreaButton userClickHandler={userClearAreaHandler} icon={<HelpOutline />} />
                    </AreaButtons>
                )}
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
