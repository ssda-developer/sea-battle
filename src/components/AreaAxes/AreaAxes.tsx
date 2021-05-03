import React, { FC } from 'react';

interface IAreaAxesProps {
    array: readonly string[];
}

const AreaAxes: FC<IAreaAxesProps> = ({ array }: IAreaAxesProps) => {
    return (
        <>
            {array.map(el => (
                <div className="cell" key={el}>
                    {el.toUpperCase()}
                </div>
            ))}
        </>
    );
};

export default AreaAxes;
