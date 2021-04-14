import React, { FC } from 'react';

const Rules: FC = () => {
    return (
        <div className="sea-battle__rules">
            <h2>Начало игры:</h2>
            <ol>
                <li>Можете самостоятельно разместить корабли.</li>
                <li>Разместить рандомно, выбирая наиболее понравившийся вариант.</li>
                <li>Просто нажмите кнопку Start Game.</li>
            </ol>
        </div>
    );
};

export default Rules;
