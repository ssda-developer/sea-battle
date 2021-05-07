import React, { FC } from 'react';

import { ReactComponent as SVGRandom } from '../../assets/icons/random.svg';
import { ReactComponent as SVGPlay } from '../../assets/icons/play.svg';

import { StyledRulesDiv, StyledRulesH2, StyledRulesUl, StyledRulesLi, StyledRulesIcon, StyledRulesP } from './styles';

const Rules: FC = () => {
    return (
        <StyledRulesDiv>
            <StyledRulesH2>Начало игры:</StyledRulesH2>
            <StyledRulesUl>
                <StyledRulesLi>Слева находится ваше поле, справа - поле противника.</StyledRulesLi>
                <StyledRulesLi>
                    Можете самостоятельно разместить корабли. Для этого кликайте мышкой по вашему полю.
                </StyledRulesLi>
                <StyledRulesLi>
                    Чтобы разместить корабли рандомно воспользуйтесь кнопкой
                    <StyledRulesIcon>
                        <SVGRandom />
                    </StyledRulesIcon>
                </StyledRulesLi>
                <StyledRulesLi>
                    Чтобы начать игру воспользуйтесь кнопкой
                    <StyledRulesIcon>
                        <SVGPlay />
                    </StyledRulesIcon>
                </StyledRulesLi>
            </StyledRulesUl>
            <StyledRulesH2>Описание игры:</StyledRulesH2>
            <StyledRulesP>Игровое поле имеет площадь 10x10. На игровом поле размещаются:</StyledRulesP>
            <StyledRulesUl>
                <StyledRulesLi>1 корабль — ряд из 4 клеток («четырёхпалубный» - линкор)</StyledRulesLi>
                <StyledRulesLi>2 корабля — ряд из 3 клеток («трёхпалубные» - крейсера)</StyledRulesLi>
                <StyledRulesLi>3 корабля — ряд из 2 клеток («двухпалубные» - эсминцы)</StyledRulesLi>
                <StyledRulesLi>4 корабля — 1 клетка («однопалубные» - торпедные катера)</StyledRulesLi>
            </StyledRulesUl>
            <StyledRulesP>
                При размещении корабли не могут касаться друг друга сторонами и углами. Расстояние между кораблями
                минимум 1 клетка.
            </StyledRulesP>
        </StyledRulesDiv>
    );
};

export default Rules;
