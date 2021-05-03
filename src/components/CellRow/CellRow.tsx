import React, { FC } from 'react';

import { Owners } from '../../enums';
import { ICell } from '../../interface';

import Cell from '../Cell/Cell';

interface ICellRowProps {
    row: Array<ICell>;
    cellRowOwner: Owners;
}

const CellRow: FC<ICellRowProps> = ({ row, cellRowOwner }: ICellRowProps) => {
    return (
        <div className="area__row">
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
        </div>
    );
};

export default CellRow;
