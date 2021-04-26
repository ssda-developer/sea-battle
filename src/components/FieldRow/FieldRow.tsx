import React, { FC, MouseEvent } from 'react';

import { IField } from '../../store/field/interfaces';

import Field from '../Field/Field';
import { Owners } from '../../store/area/interfaces';

interface IFieldRowProps {
    row: Array<IField>;
    updateCellHandler: (event: MouseEvent<HTMLButtonElement>) => void;
    owner: Owners;
}

const FieldRow: FC<IFieldRowProps> = ({ row, updateCellHandler, owner }: IFieldRowProps) => {
    return (
        <div className="area__row">
            {row.map(({ id, ship, shipId, hit, past, locked, lockedId, explode }) => (
                <Field
                    key={id}
                    id={id}
                    hit={hit}
                    ship={ship}
                    shipId={shipId}
                    past={past}
                    locked={locked}
                    lockedId={lockedId}
                    explode={explode}
                    updateCellHandler={updateCellHandler}
                    owner={owner}
                />
            ))}
        </div>
    );
};

export default FieldRow;
