import React, { FC } from 'react';

import { Owners } from '../../enums';

import { ReactComponent as SVGFrown } from '../../assets/icons/frown.svg';
import { ReactComponent as SVGSmile } from '../../assets/icons/smile.svg';

import './GameOverMessage.scss';

interface IGameOverMessageProps {
    player: Owners | null;
}

const GameOverMessage: FC<IGameOverMessageProps> = ({ player }: IGameOverMessageProps) => {
    const { User } = Owners;
    const message = player === User ? 'Поздравляем! Вы победили!' : 'Вы проиграли';

    return (
        <div className="game-over-message">
            <h2 className="game-over-message__title">
                {message}
                {player === User ? <SVGSmile /> : <SVGFrown />}
            </h2>
        </div>
    );
};

export default GameOverMessage;
