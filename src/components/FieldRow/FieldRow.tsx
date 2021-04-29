import React, { FC } from 'react';

import { ICell } from '../../interface';

import Cell from '../Cell/Cell';
import { Owners } from '../../enums';

interface ICellRowProps {
    row: Array<ICell>;
    owner: Owners;
}

const FieldRow: FC<ICellRowProps> = ({ row, owner }: ICellRowProps) => {
    return (
        <div className="area__row">
            {row.map(({ id, ship, shipId, hit, miss, locked, lockedId, explode }) => (
                <Cell
                    key={id}
                    id={id}
                    hit={hit}
                    ship={ship}
                    shipId={shipId}
                    miss={miss}
                    locked={locked}
                    lockedId={lockedId}
                    explode={explode}
                    owner={owner}
                />
            ))}
        </div>
    );
};

export default FieldRow;
