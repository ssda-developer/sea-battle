import React, { FC } from 'react';

import { Owners, HintOptions } from '../../enums';

import { ReactComponent as SVGFrown } from '../../assets/icons/frown.svg';
import { ReactComponent as SVGSmile } from '../../assets/icons/smile.svg';

import { StyledFinalMessage, StyledFinalMessageTitle } from './styles';

interface IFinalMessageProps {
    player: Owners | null;
}

const FinalMessage: FC<IFinalMessageProps> = ({ player }: IFinalMessageProps) => {
    const { User } = Owners;
    const { WinMessage, LossMessage } = HintOptions;
    const message = player === User ? WinMessage : LossMessage;

    return (
        <StyledFinalMessage>
            <StyledFinalMessageTitle>
                {message}
                {player === User ? <SVGSmile /> : <SVGFrown />}
            </StyledFinalMessageTitle>
        </StyledFinalMessage>
    );
};

export default FinalMessage;
