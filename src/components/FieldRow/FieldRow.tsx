import React, { FC } from 'react';

interface IFieldRowProps {
    className: string;
    children: any;
}

const FieldRow: FC<IFieldRowProps> = ({ className, children }: IFieldRowProps) => {
    return <div className={className}>{children}</div>;
};

export default FieldRow;
