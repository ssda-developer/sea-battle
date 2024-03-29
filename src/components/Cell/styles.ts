import styled, { css } from 'styled-components/macro';

import { Owners } from '../../enums';

const { User } = Owners;

interface IStyledCell {
    styledCellOwner: Owners | undefined;
    styledClassNames: {
        hit?: boolean;
        miss?: boolean;
        ship?: boolean;
        lock?: boolean;
        explode?: boolean;
    };
    styledDisabled: boolean;
}

const stylesCellHit = css`
    --field-background: var(--color-3--1);
    border-radius: 5px;
`;

const stylesCellMiss = css`
    &::before {
        --field-miss-size: calc(var(--field-size) / 4);

        background: var(--color-white);
        border-radius: 50%;
        content: '';
        height: var(--field-miss-size);
        width: var(--field-miss-size);
    }
`;

const stylesCellShip = css`
    --field-background: var(--color-2--3);
    border-radius: 5px;
`;

const stylesCellLock = css`
    opacity: 0.65;
`;

const stylesCellExplode = css`
    --field-background: var(--color-4--1);
    border-radius: 5px;
`;

const getStylesCell = ({ styledClassNames: { hit, miss, ship, lock, explode } }: IStyledCell): string => {
    let styles = '';

    if (miss) styles += stylesCellMiss;

    if (ship) styles += stylesCellShip;

    if (lock) styles += stylesCellLock;

    if (hit) styles += stylesCellHit;

    if (explode) styles += stylesCellExplode;

    return styles;
};

export const StyledCell = styled.button<IStyledCell>`
    --field-background: var(--color-1--2);
    --field-color: var(--color-1--4);
    --field-size: calc(var(--global-field-size) - 2px);

    align-items: center;
    background: var(--field-background);
    color: var(--field-color);
    cursor: ${({ styledCellOwner }) => (styledCellOwner === User ? 'auto' : 'crosshair')};
    display: flex;
    font-size: 15px;
    height: var(--field-size);
    justify-content: center;
    margin: 1px;
    width: var(--field-size);

    ${getStylesCell};

    @media screen and(max-width: 1279px) {
        font-size: 12px;
    }

    &:hover {
        border: ${({ styledDisabled }) => (styledDisabled ? 0 : '1px solid var(--color-white)')};
    }

    &:focus {
        outline: none;
    }
`;
