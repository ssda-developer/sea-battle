import React, { FC } from 'react';

import { Owners } from '../../enums';

import Area from '../Area';
import AreaButtons from '../AreaButtons';
import Hints from '../Hints';

import { StyledSeaBattle, StyledSeaBattleAreas, StyledSeaBattleArea } from './style';

const Game: FC = () => {
    const { User, Computer } = Owners;

    return (
        <StyledSeaBattle>
            <StyledSeaBattleAreas>
                <StyledSeaBattleArea>
                    <Area areaOwner={User} />
                    <AreaButtons />
                </StyledSeaBattleArea>
                <StyledSeaBattleArea>
                    <Area areaOwner={Computer} />
                    <Hints />
                </StyledSeaBattleArea>
            </StyledSeaBattleAreas>
        </StyledSeaBattle>
    );
};

export default Game;
