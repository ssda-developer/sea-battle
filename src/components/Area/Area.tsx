import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';
import useActions from '../../hooks/useActions';

import { AREA_LETTERS, AREA_NUMBERS, SHIPS } from '../../constants';
import { HintOptions, Owners } from '../../enums';

import { resetInitialShipsValues } from '../../utils/customCreateShip';
import Field from '../Field';
import Hints from '../Hints';
import AreaButtons from '../AreaButtons';
import AreaButton from '../AreaButton';
import Modal from '../Modal';
import Rules from '../Rules';
import WinnerMessage from '../WinnerMessage';
import { ReactComponent as SVGRandom } from '../../assets/icons/random.svg';
import { ReactComponent as SVGTrash } from '../../assets/icons/trash.svg';
import { ReactComponent as SVGQuestion } from '../../assets/icons/question.svg';
import { ReactComponent as SVGTimes } from '../../assets/icons/times.svg';
import { ReactComponent as SVGPlay } from '../../assets/icons/play.svg';
import Ships from '../Ships/Ships';
import './Area.scss';
import randomLocationShips from '../../utils/randomLocationShips';
import { createField } from '../../utils/field';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
    const { User, Computer } = Owners;
    const { PlayerShot, ComputerShot } = HintOptions;

    const {
        renderUserField,
        renderComputerField,
        changeGameStart,
        changeUserShips,
        changeComputerShips,
        changeUserFieldComplete,
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
        renderUserField(randomLocationShips(createField()));
        if (!userComplete) {
            changeUserShips([...SHIPS]);
            changeUserFieldComplete(true);
        }
    };

    const userClearAreaHandler = () => {
        renderUserField(createField());
        renderComputerField(createField());
        changeUserFieldComplete(false);
        changeUserShips([]);
        resetInitialShipsValues();
    };

    const startGameHandler = () => {
        if (!userComplete) {
            renderUserField(randomLocationShips(createField()));
            changeUserShips([...SHIPS]);
        }
        renderComputerField(randomLocationShips(createField()));
        changeComputerShips([...SHIPS]);
        changeGameStart(true);
    };

    const resetGameHandler = () => {
        userClearAreaHandler();
        renderComputerField(randomLocationShips(createField()));
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
                        <div className="cell" key={letter}>
                            {letter.toLocaleUpperCase()}
                        </div>
                    ))}
                </div>
                <div className="area__numbers">
                    {AREA_NUMBERS.map(number => (
                        <div className="cell" key={number}>
                            {number.toUpperCase()}
                        </div>
                    ))}
                </div>
                <div className={`area__wrapper ${areaClassNameDisabled} ${areaOwner.toLowerCase()}`}>
                    <Field playerAffiliation={areaOwner} />
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
