import styled from 'styled-components/macro';

export const StyledShip = styled.div`
    display: flex;
`;

export const StyledShipCell = styled.span`
    --ship-button-cell-size: calc(var(--global-field-size) / 1.6 - 1px);

    background: var(--color-2--3);
    height: var(--ship-button-cell-size);
    margin: 1px;
    width: var(--ship-button-cell-size);

    @media screen and (max-width: 1279px) {
        --ship-button-cell-size: calc(var(--global-field-size) / 1.8 - 1px);
    }
`;
