import React, { FC, MouseEvent } from 'react';

import { IField } from '../../../redux/Field/fieldInterfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../../constants/areaConstants';
import FieldRow from '../../FieldRow/FieldRow';

interface BuildSquareProps {
    currentSquare: Array<Array<IField>>;
    cellHandler: (evn: MouseEvent<HTMLButtonElement>) => void;
}

const BuildSquare: FC<BuildSquareProps> = ({ currentSquare, cellHandler }: BuildSquareProps) => {
    const square: Array<Array<IField>> = [];

    AREA_NUMBERS.forEach(number => {
        const row: Array<IField> = [];

        AREA_LETTERS.forEach(letter => {
            const cell = {
                id: `${number}${letter}`,
                ship: false,
                shipId: '',
                hit: false,
                past: false,
                locked: false,
                lockedId: '',
            };

            row.push(cell);
        });

        square.push(row);
    });

    return (
        <>
            {square.map((row: IField[], idx: number) => (
                <FieldRow key={row[idx].id} row={row} updateCellHandler={cellHandler} />
            ))}
        </>
    );
};

export default BuildSquare;
