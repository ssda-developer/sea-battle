import { MouseEvent } from 'react';

import { Owners } from '../enums';

export interface IField {
    id: string;
    ship: boolean;
    shipId: string;
    hit: boolean;
    past: boolean;
    locked: boolean;
    lockedId: string;
    explode: boolean;
    updateCellHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
    owner?: any;
}

export interface IArea {
    user: {
        userSquare: IField[][];
        userComplete: boolean;
        userShips: number[];
    };
    computer: {
        computerSquare: IField[][];
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
