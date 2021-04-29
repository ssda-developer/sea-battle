import React, { FC } from 'react';

import { IField } from '../../interface';

import Field from '../Field/Field';
import { Owners } from '../../enums';

interface IFieldRowProps {
    row: Array<IField>;
    owner: Owners;
}

const FieldRow: FC<IFieldRowProps> = ({ row, owner }: IFieldRowProps) => {
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
                    owner={owner}
                />
            ))}
        </div>
    );
};

export default FieldRow;
