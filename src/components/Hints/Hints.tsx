import React, { FC } from 'react';

import './Hints.scss';

interface IHintsProps {
    hintText: string;
}

const Hints: FC<IHintsProps> = ({ hintText }: IHintsProps) => {
    return (
        <div className="sea-battle__hints hints">
            <p>{hintText}</p>
        </div>
    );
};

export default Hints;
