import React, { Component, ReactElement } from 'react';
import Field from '../Field/Field';

import './Area.scss';

// interface ICellInterface {
//     name: string;
//     ship: boolean;
//     wounded: boolean;
//     beside: boolean;
// }

class Area extends Component {
    state = {
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    };

    square = [];

    getFields = (items: string[]) => {
        return items.map(cell => <Field key={cell} cell={cell} />);
    };

    render(): ReactElement {
        const { numbers, letters } = this.state;
        numbers.forEach(number => {
            letters.forEach(letter => {
                this.square.push([letter, number] as never);
                // const cell = {
                //     name: `${letter}${number}`,
                //     ship: false,
                //     wounded: false,
                //     beside: false,
                // };
                //
                // this.square.push(cell as never);
            });
        });

        return (
            <div className="area__wrapper">
                <div className="area__letters">{this.getFields(letters)}</div>
                <div className="area__numbers">{this.getFields(numbers)}</div>
                <div className="area">{this.getFields(this.square)}</div>
            </div>
        );
    }
}

export default Area;
