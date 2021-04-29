import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import useActions from '../../hooks/useActions';
import { AREA_LETTERS, AREA_NUMBERS, SHIPS } from '../../constants';
import { HintOptions, Owners } from '../../enums';
import randomShipPlacement from '../../utils/randomShipPlacement';
import { resetShipsValues } from '../../utils/customShipPlacement';
import { createSquare } from '../../utils/areaUtils';
import Square from '../Square';
import Hints from '../Hints';
import AreaButtons from '../AreaButtons';
import AreaButton from '../AreaButton';
import Modal from '../Modal';
import Rules from '../Rules';
import WinnerMessage from '../WinnerMessage';
import { ReactComponent as SVGRandom } from '../../icons/random.svg';
import { ReactComponent as SVGTrash } from '../../icons/trash.svg';
import { ReactComponent as SVGQuestion } from '../../icons/question.svg';
import { ReactComponent as SVGTimes } from '../../icons/times.svg';
import { ReactComponent as SVGPlay } from '../../icons/play.svg';
import Ships from '../Ships/Ships';
import './Area.scss';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
    const { User, Computer } = Owners;
    const { PlayerShot, ComputerShot } = HintOptions;

    const {
        renderUserSquare,
        renderComputerSquare,
        changeGameStart,
        changeUserShips,
        changeComputerShips,
        changeUserSquareComplete,
        changeGameOver,
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
        renderUserSquare(randomShipPlacement(createSquare()));
        if (!userComplete) {
            changeUserShips([...SHIPS]);
            changeUserSquareComplete(true);
        }
    };

    const userClearAreaHandler = () => {
        renderUserSquare(createSquare());
        renderComputerSquare(createSquare());
        changeUserSquareComplete(false);
        changeUserShips([]);
        resetShipsValues();
    };

    const startGameHandler = () => {
        if (!userComplete) {
            renderUserSquare(randomShipPlacement(createSquare()));
            changeUserShips([...SHIPS]);
        }
        renderComputerSquare(randomShipPlacement(createSquare()));
        changeComputerShips([...SHIPS]);
        changeGameStart(true);
    };

    const resetGameHandler = () => {
        userClearAreaHandler();
        renderComputerSquare(randomShipPlacement(createSquare()));
        changeGameStart(false);
        changeUserShips([]);
        changeComputerShips([]);
    };

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);

        if (gameOver) {
            changeGameOver(false);
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
                    <Square playerAffiliation={areaOwner} />
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
