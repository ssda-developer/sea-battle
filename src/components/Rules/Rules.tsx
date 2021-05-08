import React, { FC } from 'react';

import { ReactComponent as SVGRandom } from '../../assets/icons/random.svg';
import { ReactComponent as SVGPlay } from '../../assets/icons/play.svg';

import { StyledRules, StyledRulesTitle, StyledRulesIcon } from './styles';

const Rules: FC = () => {
    return (
        <StyledRules>
            <StyledRulesTitle>Начало игры:</StyledRulesTitle>
            <ul>
                <li>Слева находится ваше поле, справа - поле противника.</li>
                <li>Можете самостоятельно разместить корабли. Для этого кликайте мышкой по вашему полю.</li>
                <li>
                    Чтобы разместить корабли рандомно воспользуйтесь кнопкой
                    <StyledRulesIcon>
                        <SVGRandom />
                    </StyledRulesIcon>
                </li>
                <li>
                    Чтобы начать игру воспользуйтесь кнопкой
                    <StyledRulesIcon>
                        <SVGPlay />
                    </StyledRulesIcon>
                </li>
            </ul>
            <StyledRulesTitle>Описание игры:</StyledRulesTitle>
            <p>Игровое поле имеет площадь 10x10. На игровом поле размещаются:</p>
            <ul>
                <li>1 корабль — ряд из 4 клеток («четырёхпалубный» - линкор)</li>
                <li>2 корабля — ряд из 3 клеток («трёхпалубные» - крейсера)</li>
                <li>3 корабля — ряд из 2 клеток («двухпалубные» - эсминцы)</li>
                <li>4 корабля — 1 клетка («однопалубные» - торпедные катера)</li>
            </ul>
            <p>
                При размещении корабли не могут касаться друг друга сторонами и углами. Расстояние между кораблями
                минимум 1 клетка.
            </p>
        </StyledRules>
    );
};

export default Rules;
