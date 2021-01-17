import React, { FC, useState, useEffect } from 'react';
import Field from '../Field/Field';
import './Area.scss';

const AREA_SIZE = 10;

const Area: FC = () => {
    const [square, setSquare] = useState<string[]>(['']);

    useEffect(() => {
        for (let i = 0; i < AREA_SIZE; i += 1) {
            setSquare(prev => [...prev, String.fromCharCode(i + 65)]);
        }
    }, []);

    return (
        <div className="area">
            <div>{square}</div>
        </div>
    );
};

export default Area;
