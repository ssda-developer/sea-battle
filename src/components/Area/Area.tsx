import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

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
import Modal from '../Modal/Modal';

import { ReactComponent as SVGRandom } from '../../icons/random.svg';
import { ReactComponent as SVGTrash } from '../../icons/trash.svg';
import { ReactComponent as SVGQuestion } from '../../icons/question.svg';
import { ReactComponent as SVGTimes } from '../../icons/times.svg';
import { ReactComponent as SVGPlay } from '../../icons/play.svg';

import './Area.scss';

interface AreaProps {
    owner: Owners;
}

const Area: FC<AreaProps> = ({ owner }: AreaProps) => {
    const { User, Computer } = Owners;
    const { PlayerShot, ComputerShot } = HintOptions;

    const { renderFriendlySquare, renderEnemySquare, changeGameStatus } = useActions();

    const { owner: currentOwner } = useSelector(({ areaReducer }: RootStore) => areaReducer);
    const { gameStatus } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const [open, setOpen] = useState(false);

    const userBuildRandomShipsHandler = () => {
        renderFriendlySquare(randomShipPlacement(createSquare()));
    };

    const userClearAreaHandler = () => {
        renderFriendlySquare(createSquare());
        resetShipsValues();
    };

    const startGameHandler = () => {
        renderFriendlySquare(randomShipPlacement(createSquare()));
        renderEnemySquare(randomShipPlacement(createSquare()));
        changeGameStatus(true);
    };

    const resetGameHandler = () => {
        userClearAreaHandler();
        renderEnemySquare(randomShipPlacement(createSquare()));
        changeGameStatus(false);
    };

    const openModal = (status: boolean) => {
        setOpen(status);
    };

    const areaClassNameDisabled =
        (owner === Computer && !gameStatus) || (owner === User && gameStatus) || currentOwner === Computer ? 'is-disabled' : '';

    const displayHints = () => {
        return currentOwner === User ? PlayerShot : ComputerShot;
    };

    return (
        <div className="area">
            <div className="area__container">
                {owner === User && (
                    <AreaButtons>
                        {gameStatus ? (
                            <AreaButton userClickHandler={resetGameHandler} icon={<SVGTimes />} />
                        ) : (
                            <>
                                <AreaButton
                                    userClickHandler={() => {
                                        openModal(true);
                                    }}
                                    icon={<SVGQuestion />}
                                />
                                <AreaButton userClickHandler={userBuildRandomShipsHandler} icon={<SVGRandom />} />
                                <AreaButton userClickHandler={userClearAreaHandler} icon={<SVGTrash />} />
                                <AreaButton userClickHandler={startGameHandler} icon={<SVGPlay />} />
                            </>
                        )}
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
            {open && <Modal changeModalStatus={openModal} />}
            {owner === Computer && gameStatus && <Hints hintText={displayHints()} />}
        </div>
    );
};

export default Area;
