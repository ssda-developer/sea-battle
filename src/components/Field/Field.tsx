import React, { FC } from 'react';
import './Field.scss';

interface IFieldProps {
    cell: string;
}

const Field: FC<IFieldProps> = ({ cell }: IFieldProps) => {
    const clickHandler = ({ target }: any) => {
        console.log(target.innerHTML);
    };

    return (
        <button type="button" className="field" onClick={clickHandler}>
            {cell}
        </button>
    );
};

export default Field;
