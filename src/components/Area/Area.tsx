import React, { Component, ReactElement } from 'react';
import './Area.scss';

class Area extends Component {
    state = {
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    };

    square = [];

    render(): ReactElement {
        const { numbers, letters } = this.state;
        numbers.forEach(number => {
            letters.forEach(letter => {
                this.square.push([number, letter] as never);
            });
        });

        return <div className="area">area</div>;
    }
}

export default Area;
