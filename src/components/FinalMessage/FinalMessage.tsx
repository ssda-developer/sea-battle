import React, { FC } from 'react';

import { Owners, HintOptions } from '../../enums';

import { ReactComponent as SVGFrown } from '../../assets/icons/frown.svg';
import { ReactComponent as SVGSmile } from '../../assets/icons/smile.svg';

import './FinalMessage.scss';

interface IFinalMessageProps {
    player: Owners | null;
}

const FinalMessage: FC<IFinalMessageProps> = ({ player }: IFinalMessageProps) => {
    const { User } = Owners;
    const { WinMessage, LossMessage } = HintOptions;
    const message = player === User ? WinMessage : LossMessage;

    return (
        <div className="final-message">
            <h2 className="final-message__title">
                {message}
                {player === User ? <SVGSmile /> : <SVGFrown />}
            </h2>
        </div>
    );
};

export default FinalMessage;
