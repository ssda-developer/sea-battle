import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../redux/store';
import { renderSquare, changeOwns } from '../../redux/Area/areaActions';
import { IOwns } from '../../redux/Area/areaInterfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import { updateCell, createSquare, addShip } from '../../redux/Area/areaUtils';

import Field from '../Field/Field';
import FieldRow from '../FieldRow/FieldRow';

import './Area.scss';

const Area: FC<IOwns> = (owns: IOwns) => {
    const dispatch = useDispatch();
    const areaState = useSelector((state: RootStore) => state.areaReducer);

    useEffect(() => {
        const square = createSquare();
        console.log(square);

        dispatch(renderSquare(square));
        dispatch(changeOwns(owns));
    }, []);

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;

        // dispatch(renderSquare(updateCell(areaState.square, id)));
        dispatch(renderSquare(addShip(areaState.square, id)));
    };

    return (
        <div className="area">
            <div className="area__letters">
                {AREA_LETTERS.map(letter => (
                    <div className="field" key={letter}>
                        {letter}
                    </div>
                ))}
            </div>
            <div className="area__numbers">
                {AREA_NUMBERS.map(number => (
                    <div className="field" key={number}>
                        {number}
                    </div>
                ))}
            </div>
            <div className="area__wrapper">
                {areaState.square.map((row, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <FieldRow key={`row${idx}`} row={row} updateCellHandler={updateCellHandler} />
                ))}
                {/* {areaState.square.map(({ id, ship, hit, past }) => ( */}
                {/*    <Field key={id} id={id} hit={hit} ship={ship} past={past} updateCellHandler={updateCellHandler} /> */}
                {/* ))} */}
            </div>
        </div>
    );
};

export default Area;
