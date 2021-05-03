import React, { FC } from 'react';

interface IHintsProps {
    hintText: string;
}

const Hints: FC<IHintsProps> = ({ hintText }: IHintsProps) => {
    return (
        <div className="sea-battle__hints hints">
            <h2>{hintText}</h2>
        </div>
    );
};

export default Hints;
