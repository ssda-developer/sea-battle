import React, { FC } from 'react';

import { IHints } from '../../interface';

const Hints: FC<IHints> = ({ hintText }: IHints) => {
    return (
        <div className="sea-battle__hints hints">
            <h2>{hintText}</h2>
        </div>
    );
};

export default Hints;
