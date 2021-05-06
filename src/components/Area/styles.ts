import styled, { css } from 'styled-components';

import { Owners } from '../../enums';

interface IAreaDiv {
    aOwner: Owners;
}

export const AreaDiv = styled.div<IAreaDiv>`
    --area-row-size: calc(var(--global-field-size) * 10);

    position: relative;
    width: 100%;
`;

export const AreaContainerDiv = styled.div`
    background-color: var(--color-1--4);
    display: flex;
    flex-wrap: wrap;
    position: relative;
`;

export const AreaLettersDiv = styled.div`
    display: flex;
    padding-left: var(--global-field-size);
    pointer-events: none;
`;

export const AreaNumbersDiv = styled.div`
    display: flex;
    flex-direction: column;
    pointer-events: none;
`;

const areaWrapperDivDisabledStyles = css`
    opacity: 0.8;
    pointer-events: none;

    * {
        opacity: 1;
    }
`;

interface IAreaWrapperDiv {
    isDisabled: boolean;
}

export const AreaWrapperDiv = styled.div<IAreaWrapperDiv>`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    width: var(--area-row-size);

    ${({ isDisabled }) => isDisabled && areaWrapperDivDisabledStyles}
`;
