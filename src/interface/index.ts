import { MouseEvent } from 'react';

import { Owners } from '../enums';

export interface ICell {
    id: string;
    ship: boolean;
    shipId: string;
    hit: boolean;
    miss: boolean;
    locked: boolean;
    lockedId: string;
    explode: boolean;
    updateCellHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
    owner?: any;
}

export interface IArea {
    user: {
        userSquare: ICell[][];
        userComplete: boolean;
        userShips: number[];
    };
    computer: {
        computerSquare: ICell[][];
        computerShips: number[];
    };
}

export interface IGame {
    gameStart: boolean;
    gameOver: boolean;
    currentPlayer: Owners | null;
}

export interface IHints {
    hintText: string;
}
