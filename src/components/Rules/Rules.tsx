import React, { FC } from 'react';

import './Rules.scss';

const Rules: FC = () => {
    return (
        <div className="rules">
            <h2 className="rules__title">Начало игры:</h2>
            <ol className="rules__list">
                <li>Можете самостоятельно разместить корабли.</li>
                <li>Разместить рандомно, выбирая наиболее понравившийся вариант.</li>
                <li>Просто нажмите кнопку Start Game, чтобы начать.</li>
            </ol>
        </div>
    );
};

export default Rules;
