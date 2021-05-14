import React, { FC } from 'react';

import { Owners } from '../../enums';
import { ICell } from '../../interface';

import Cell from '../Cell';

import { StyledCellRow } from './styles';

interface ICellRowProps {
    row: ICell[];
    cellRowOwner: Owners;
}

const CellRow: FC<ICellRowProps> = ({ row, cellRowOwner }: ICellRowProps) => {
    return (
        <StyledCellRow>
            {row.map(({ id, ship, shipId, hit, miss, lock, lockId, explode }) => (
                <Cell
                    key={id}
                    id={id}
                    hit={hit}
                    ship={ship}
                    shipId={shipId}
                    miss={miss}
                    lock={lock}
                    lockId={lockId}
                    explode={explode}
                    owner={cellRowOwner}
                />
            ))}
        </StyledCellRow>
    );
};

export default CellRow;
