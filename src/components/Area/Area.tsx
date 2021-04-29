import React, { FC, useEffect, useState } from 'react';
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
import Rules from '../Rules/Rules';
import WinnerMessage from '../WinnerMessage/WinnerMessage';

import { ReactComponent as SVGRandom } from '../../icons/random.svg';
import { ReactComponent as SVGTrash } from '../../icons/trash.svg';
import { ReactComponent as SVGQuestion } from '../../icons/question.svg';
import { ReactComponent as SVGTimes } from '../../icons/times.svg';
import { ReactComponent as SVGPlay } from '../../icons/play.svg';

import './Area.scss';
import Ships from '../Ships/Ships';
import { SHIPS } from '../../constants/shipsConstants';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
    const { User, Computer } = Owners;
    const { PlayerShot, ComputerShot } = HintOptions;

    const {
        RenderUserSquare,
        RenderComputerSquare,
        ChangeGameStart,
        ChangeUserShips,
        ChangeComputerShips,
        ChangeUserSquareComplete,
        ChangeGameOver,
    } = useActions();

    const {
        user: { userComplete },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);
    const { gameStart, gameOver, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (gameOver) {
            setOpen(true);
        }
    }, [gameOver]);

    const userBuildRandomShipsHandler = () => {
        RenderUserSquare(randomShipPlacement(createSquare()));
        if (!userComplete) {
            ChangeUserShips([...SHIPS]);
            ChangeUserSquareComplete(true);
        }
    };

    const userClearAreaHandler = () => {
        RenderUserSquare(createSquare());
        RenderComputerSquare(createSquare());
        ChangeUserSquareComplete(false);
        ChangeUserShips([]);
        resetShipsValues();
    };

    const startGameHandler = () => {
        if (!userComplete) {
            RenderUserSquare(randomShipPlacement(createSquare()));
            ChangeUserShips([...SHIPS]);
        }
        RenderComputerSquare(randomShipPlacement(createSquare()));
        ChangeComputerShips([...SHIPS]);
        ChangeGameStart(true);
    };

    const resetGameHandler = () => {
        userClearAreaHandler();
        RenderComputerSquare(randomShipPlacement(createSquare()));
        ChangeGameStart(false);
        ChangeUserShips([]);
        ChangeComputerShips([]);
    };

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);

        if (gameOver) {
            ChangeGameOver(false);
        }
    };

    const areaClassNameDisabled =
        (areaOwner === Computer && !gameStart) || (areaOwner === User && gameStart) || currentPlayer === Computer ? 'is-disabled' : '';

    const displayHints = () => {
        return currentPlayer === Computer ? ComputerShot : PlayerShot;
    };

    return (
        <div className={`area ${areaOwner.toLowerCase()}`}>
            <Ships shipsOwner={areaOwner} />
            <div className="area__container">
                {areaOwner === User && (
                    <AreaButtons>
                        {gameStart ? (
                            <AreaButton userClickHandler={resetGameHandler} icon={<SVGTimes />} />
                        ) : (
                            <>
                                <AreaButton
                                    userClickHandler={() => {
                                        openModal();
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
                <div className={`area__wrapper ${areaClassNameDisabled} ${areaOwner.toLowerCase()}`}>
                    <BuildSquare playerAffiliation={areaOwner} />
                </div>
            </div>
            {open && (
                <Modal clickedOutside={closeModal}>{!gameStart && !gameOver ? <Rules /> : <WinnerMessage player={currentPlayer} />}</Modal>
            )}
            {areaOwner === Computer && gameStart && <Hints hintText={displayHints()} />}
        </div>
    );
};

export default Area;
