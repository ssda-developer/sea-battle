import React, { FC } from 'react';

import { StyledHints, StyledHintsText } from './styles';

interface IHintsProps {
    hintText: string;
}

const Hints: FC<IHintsProps> = ({ hintText }: IHintsProps) => {
    return (
        <StyledHints>
            <StyledHintsText>{hintText}</StyledHintsText>
        </StyledHints>
    );
};

export default Hints;
