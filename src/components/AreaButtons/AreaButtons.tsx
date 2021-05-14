import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';
import useActions from '../../hooks';

import { SHIPS } from '../../constants';
import { Owners } from '../../enums';

import { resetInitialShipsValues } from '../../utils/customCreateShip';
import { createField } from '../../utils/field';
import randomLocationShips from '../../utils/randomLocationShips';

import AreaButton from '../AreaButton';
import FinalMessage from '../FinalMessage';
import Modal from '../Modal';
import Rules from '../Rules';

import { ReactComponent as SVGPlay } from '../../assets/icons/play.svg';
import { ReactComponent as SVGQuestion } from '../../assets/icons/question.svg';
import { ReactComponent as SVGRandom } from '../../assets/icons/random.svg';
import { ReactComponent as SVGTimes } from '../../assets/icons/times.svg';
import { ReactComponent as SVGTrash } from '../../assets/icons/trash.svg';

import { StyledAreaButtons } from './styles';

const AreaButtons: FC = () => {
    const { User } = Owners;

    const {
        user: { userComplete },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const { gameStart, gameOver, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const [openModal, setOpenModal] = useState(false);

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

    const openModalHandler = (): void => {
        setOpenModal(true);
    };

    const closeModalHandler = (): void => {
        setOpenModal(false);

        if (gameOver) {
            changeGameOver(false);
        }
    };

    const areaButtons = useMemo(() => {
        return (
            <StyledAreaButtons>
                {gameStart ? (
                    <AreaButton clicked={resetGameHandler} icon={<SVGTimes />} />
                ) : (
                    <>
                        <AreaButton clicked={openModalHandler} icon={<SVGQuestion />} />
                        <AreaButton clicked={userRandomLocationShipsHandler} icon={<SVGRandom />} />
                        <AreaButton clicked={userClearFieldHandler} icon={<SVGTrash />} />
                        <AreaButton clicked={startGameHandler} icon={<SVGPlay />} />
                    </>
                )}
            </StyledAreaButtons>
        );
    }, [gameStart]);

    return (
        <>
            {areaButtons}
            {(gameOver || openModal) && (
                <Modal clickedOutside={closeModalHandler}>
                    {gameOver && <FinalMessage player={currentPlayer} />}
                    {openModal && <Rules />}
                </Modal>
            )}
        </>
    );
};

export default AreaButtons;
