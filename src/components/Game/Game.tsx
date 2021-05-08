import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';
import useActions from '../../hooks';

import { SHIPS } from '../../constants';
import { HintOptions, Owners } from '../../enums';

import { resetInitialShipsValues } from '../../utils/customCreateShip';
import { createField } from '../../utils/field';
import randomLocationShips from '../../utils/randomLocationShips';

import Area from '../Area';
import AreaButton from '../AreaButton';
import AreaButtons from '../AreaButtons';
import FinalMessage from '../FinalMessage';
import Hints from '../Hints';
import Modal from '../Modal';
import Rules from '../Rules';

import { ReactComponent as SVGPlay } from '../../assets/icons/play.svg';
import { ReactComponent as SVGQuestion } from '../../assets/icons/question.svg';
import { ReactComponent as SVGRandom } from '../../assets/icons/random.svg';
import { ReactComponent as SVGTimes } from '../../assets/icons/times.svg';
import { ReactComponent as SVGTrash } from '../../assets/icons/trash.svg';

import { StyledSeaBattle, StyledSeaBattleAreas, StyledSeaBattleArea } from './style';

const Game: FC = () => {
    const { User, Computer } = Owners;
    const { PlayerShot, ComputerShot } = HintOptions;

    const {
        user: { userComplete },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const { gameStart, gameOver, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const [openHints, setOpenHints] = useState(false);

    const displayHints = currentPlayer === Computer ? ComputerShot : PlayerShot;

    const {
        renderUserField,
        renderComputerField,
        changeGameStart,
        changeUserShips,
        changeComputerShips,
        changeUserFieldComplete,
        changeGameOver,
        changeCurrentPlayer,
    } = useActions();

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
        changeCurrentPlayer(User);
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
        <StyledSeaBattle>
            <StyledSeaBattleAreas>
                <StyledSeaBattleArea>
                    <Area areaOwner={User} />
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
                </StyledSeaBattleArea>
                <StyledSeaBattleArea>
                    <Area areaOwner={Computer} />
                    {gameStart && <Hints hintText={displayHints} />}
                </StyledSeaBattleArea>
            </StyledSeaBattleAreas>
            {gameOver && (
                <Modal clickedOutside={closeModal}>
                    <FinalMessage player={currentPlayer} />
                </Modal>
            )}
            {openHints && (
                <Modal clickedOutside={closeModal}>
                    <Rules />
                </Modal>
            )}
        </StyledSeaBattle>
    );
};

export default Game;
