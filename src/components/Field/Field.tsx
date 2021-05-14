import React, { FC } from 'react';

import { Owners } from '../../enums';
import { ICell } from '../../interface';

import CellRow from '../CellRow';

interface IFieldProps {
    fieldOwner: Owners;
    fieldArray: ICell[][];
}

const Field: FC<IFieldProps> = ({ fieldOwner, fieldArray }: IFieldProps) => {
    return (
        <>
            {fieldArray.map((row: ICell[], idx: number) => (
                <CellRow key={row[idx].id} row={row} cellRowOwner={fieldOwner} />
            ))}
        </>
    );
};

export default Field;
