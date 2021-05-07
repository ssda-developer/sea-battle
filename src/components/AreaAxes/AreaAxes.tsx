import React, { FC } from 'react';

import { StyledAreaAxesCell } from './styles';

interface IAreaAxesProps {
    array: readonly string[];
}

const AreaAxes: FC<IAreaAxesProps> = ({ array }: IAreaAxesProps) => {
    return (
        <>
            {array.map(el => (
                <StyledAreaAxesCell key={el}>{el.toUpperCase()}</StyledAreaAxesCell>
            ))}
        </>
    );
};

export default AreaAxes;
