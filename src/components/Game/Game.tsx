import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { Owners } from '../../enums';

import Area from '../Area';
import AreaButtons from '../AreaButtons';
import Hints from '../Hints';

import { StyledSeaBattle, StyledSeaBattleAreas, StyledSeaBattleArea } from './style';

const Game: FC = () => {
    const { User, Computer } = Owners;

    const { gameStart } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    return (
        <StyledSeaBattle>
            <StyledSeaBattleAreas>
                <StyledSeaBattleArea>
                    <Area areaOwner={User} />
                    <AreaButtons />
                </StyledSeaBattleArea>
                <StyledSeaBattleArea>
                    <Area areaOwner={Computer} />
                    {gameStart && <Hints />}
                </StyledSeaBattleArea>
            </StyledSeaBattleAreas>
        </StyledSeaBattle>
    );
};

export default memo(Game);
