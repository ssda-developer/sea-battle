import React, { FC } from 'react';
import { ReactComponent as SVGRandom } from '../../icons/random.svg';
import { ReactComponent as SVGPlay } from '../../icons/play.svg';

import './Rules.scss';

const Rules: FC = () => {
    return (
        <div className="rules">
            <h2 className="rules__title">Начало игры:</h2>
            <ul className="rules__list">
                <li>Слева находится ваше поле, справа - поле вашего противника.</li>
                <li>Можете самостоятельно разместить корабли.</li>
                <li>
                    Чтобы разместить корабли рандомно, воспользуйтесь кнопкой
                    <span>
                        <SVGRandom />
                    </span>
                </li>
                <li>
                    Чтобы начать игру нажмите кнопку
                    <span>
                        <SVGPlay />
                    </span>
                </li>
            </ul>
            <h2 className="rules__title">Описание игры:</h2>
            <p>Игровое поле имеет площадь 10x10. На игровом поле размещаются:</p>
            <p>1 корабль — ряд из 4 клеток («четырёхпалубный»; линкор)</p>
            <p>2 корабля — ряд из 3 клеток («трёхпалубные»; крейсера)</p>
            <p>3 корабля — ряд из 2 клеток («двухпалубные»; эсминцы)</p>
            <p>4 корабля — 1 клетка («однопалубные»; торпедные катера)</p>
            <p>При размещении корабли не могут касаться друг друга сторонами и углами. Расстояние между кораблями минимум 1 клетка.</p>
        </div>
    );
};

export default Rules;
