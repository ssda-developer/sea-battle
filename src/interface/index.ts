import { MouseEvent } from 'react';

import { Owners } from '../enums';

export interface ICell {
    id: string;
    ship: boolean;
    shipId: string;
    hit: boolean;
    miss: boolean;
    lock: boolean;
    lockId: string;
    explode: boolean;
    updateCellHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
    owner?: any;
}

export interface IArea {
    user: {
        userField: ICell[][];
        userComplete: boolean;
        userShips: number[];
    };
    computer: {
        computerField: ICell[][];
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
