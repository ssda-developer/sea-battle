import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';
import useActions from '../../hooks/useActions';

import { AREA_LETTERS, AREA_NUMBERS, SHIPS } from '../../constants';
import { HintOptions, Owners } from '../../enums';

import { resetInitialShipsValues } from '../../utils/customCreateShip';
import { createField } from '../../utils/field';
import randomLocationShips from '../../utils/randomLocationShips';

import AreaAxes from '../AreaAxes';
import AreaButton from '../AreaButton';
import AreaButtons from '../AreaButtons';
import Field from '../Field';
import FinalMessage from '../FinalMessage';
import Hints from '../Hints';
import Modal from '../Modal';
import Rules from '../Rules';
import Ships from '../Ships/Ships';

import { ReactComponent as SVGPlay } from '../../assets/icons/play.svg';
import { ReactComponent as SVGQuestion } from '../../assets/icons/question.svg';
import { ReactComponent as SVGRandom } from '../../assets/icons/random.svg';
import { ReactComponent as SVGTimes } from '../../assets/icons/times.svg';
import { ReactComponent as SVGTrash } from '../../assets/icons/trash.svg';

import './Area.scss';

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

    const [openHints, setOpenHints] = useState(false);

    useEffect(() => {
        if (gameOver) {
            setOpenHints(true);
        }
    }, [gameOver]);

    const displayHints = currentPlayer === Computer ? ComputerShot : PlayerShot;
    const fieldClassNameDisabled =
        (areaOwner === Computer && !gameStart) || (areaOwner === User && gameStart) || currentPlayer === Computer ? 'is-disabled' : '';

    const userRandomLocationShipsHandler = (): void => {
        renderUserField(randomLocationShips(createField()));

        if (!userComplete) {
            changeUserShips([...SHIPS]);
            changeUserFieldComplete(true);
        }
    };

    const userClearFieldHandler = (): void => {
        renderUserField(createField());
        renderComputerField(createField());
        changeUserFieldComplete(false);
        changeUserShips([]);
        changeComputerShips([]);
        resetInitialShipsValues();
    };

    const startGameHandler = (): void => {
        if (!userComplete) {
            renderUserField(randomLocationShips(createField()));
            changeUserShips([...SHIPS]);
        }

        renderComputerField(randomLocationShips(createField()));
        changeComputerShips([...SHIPS]);
        changeGameStart(true);
    };

    const resetGameHandler = (): void => {
        userClearFieldHandler();
        changeGameStart(false);
    };

    const openModal = (): void => {
        setOpenHints(true);
    };

    const closeModal = (): void => {
        setOpenHints(false);

        if (gameOver) {
            changeGameOver(false);
        }
    };

    return (
        <div className={`area ${areaOwner.toLowerCase()}`}>
            <Ships shipsOwner={areaOwner} />
            <div className="area__container">
                {areaOwner === User && (
                    <AreaButtons>
                        {gameStart ? (
                            <AreaButton clicked={resetGameHandler} icon={<SVGTimes />} />
                        ) : (
                            <>
                                <AreaButton clicked={openModal} icon={<SVGQuestion />} />
                                <AreaButton clicked={userRandomLocationShipsHandler} icon={<SVGRandom />} />
                                <AreaButton clicked={userClearFieldHandler} icon={<SVGTrash />} />
                                <AreaButton clicked={startGameHandler} icon={<SVGPlay />} />
                            </>
                        )}
                    </AreaButtons>
                )}
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
            {openHints && (
                <Modal clickedOutside={closeModal}>{!gameStart && !gameOver ? <Rules /> : <FinalMessage player={currentPlayer} />}</Modal>
            )}
            {areaOwner === Computer && gameStart && <Hints hintText={displayHints} />}
        </div>
    );
};

export default Area;
