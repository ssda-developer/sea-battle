import React, { FC, MouseEvent } from 'react';
import { IField } from '../../redux/Field/fieldInterfaces';
import Field from '../Field/Field';

interface IFieldRowProps {
    row: Array<IField>;
    updateCellHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FieldRow: FC<IFieldRowProps> = ({ row, updateCellHandler }: IFieldRowProps) => {
    return (
        <div className="area__row">
            {row.map(({ id, ship, shipId, hit, past, locked, lockedId }) => (
                <Field
                    key={id}
                    id={id}
                    hit={hit}
                    ship={ship}
                    shipId={shipId}
                    past={past}
                    locked={locked}
                    lockedId={lockedId}
                    updateCellHandler={updateCellHandler}
                />
            ))}
        </div>
    );
};

export default FieldRow;
