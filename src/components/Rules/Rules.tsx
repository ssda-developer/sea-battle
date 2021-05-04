import React, { FC } from 'react';

import { ReactComponent as SVGRandom } from '../../assets/icons/random.svg';
import { ReactComponent as SVGPlay } from '../../assets/icons/play.svg';

import './Rules.scss';

const Rules: FC = () => {
    return (
        <div className="rules">
            <h2 className="rules__title">Начало игры:</h2>
            <ul className="rules__list">
                <li>Слева находится ваше поле, справа - поле противника.</li>
                <li>Можете самостоятельно разместить корабли. Для этого кликайте мышкой по вашему полю.</li>
                <li>
                    Чтобы разместить корабли рандомно воспользуйтесь кнопкой
                    <span className="rules__icon">
                        <SVGRandom />
                    </span>
                </li>
                <li>
                    Чтобы начать игру воспользуйтесь кнопкой
                    <span className="rules__icon">
                        <SVGPlay />
                    </span>
                </li>
            </ul>
            <h2 className="rules__title">Описание игры:</h2>
            <p>Игровое поле имеет площадь 10x10. На игровом поле размещаются:</p>
            <ul className="rules__list">
                <li>1 корабль — ряд из 4 клеток («четырёхпалубный» - линкор)</li>
                <li>2 корабля — ряд из 3 клеток («трёхпалубные» - крейсера)</li>
                <li>3 корабля — ряд из 2 клеток («двухпалубные» - эсминцы)</li>
                <li>4 корабля — 1 клетка («однопалубные» - торпедные катера)</li>
            </ul>
            <p>При размещении корабли не могут касаться друг друга сторонами и углами. Расстояние между кораблями минимум 1 клетка.</p>
        </div>
    );
};

export default Rules;
