import React, { FC } from 'react';

import { Owners } from '../../interface/area';

import { ReactComponent as SVGFrown } from '../../icons/frown.svg';
import { ReactComponent as SVGSmile } from '../../icons/smile.svg';

import './WinnerMessage.scss';

type WinnerMessageProps = {
    player: Owners | null;
};

const WinnerMessage: FC<WinnerMessageProps> = ({ player }: WinnerMessageProps) => {
    const { User } = Owners;
    const message = player === User ? 'Поздравляем! Вы победили!' : 'Вы проиграли';
    return (
        <div className="winner-message">
            <h2 className="winner-message__title">
                {message}
                {player === User ? <SVGSmile /> : <SVGFrown />}
            </h2>
        </div>
    );
};

export default WinnerMessage;
