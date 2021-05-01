import React, { FC } from 'react';

import { ICell } from '../../interface';

import Cell from '../Cell/Cell';
import { Owners } from '../../enums';

interface ICellRowProps {
    row: Array<ICell>;
    owner: Owners;
}

const CellRow: FC<ICellRowProps> = ({ row, owner }: ICellRowProps) => {
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
                    owner={owner}
                />
            ))}
        </div>
    );
};

export default CellRow;
