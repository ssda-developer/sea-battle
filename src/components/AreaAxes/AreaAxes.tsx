import React, { FC } from 'react';

import { AreaAxesCell } from './styles';

interface IAreaAxesProps {
    array: readonly string[];
}

const AreaAxes: FC<IAreaAxesProps> = ({ array }: IAreaAxesProps) => {
    return (
        <>
            {array.map(el => (
                <AreaAxesCell key={el}>{el.toUpperCase()}</AreaAxesCell>
            ))}
        </>
    );
};

export default AreaAxes;
