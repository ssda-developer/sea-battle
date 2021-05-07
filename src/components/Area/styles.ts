import styled, { css } from 'styled-components';

interface IAreaWrapperDiv {
    isDisabled: boolean;
}

const stylesAreaWrapperDivDisabled = css`
    opacity: 0.8;
    pointer-events: none;

    * {
        opacity: 1;
    }
`;

export const StyledAreaDiv = styled.div`
    --area-row-size: calc(var(--global-field-size) * 10);

    position: relative;
    width: 100%;
`;

export const StyledAreaContainerDiv = styled.div`
    background-color: var(--color-1--4);
    display: flex;
    flex-wrap: wrap;
    position: relative;
`;

export const StyledAreaLettersDiv = styled.div`
    padding-left: var(--global-field-size);
    display: flex;
    pointer-events: none;
`;

export const StyledAreaNumbersDiv = styled.div`
    display: flex;
    flex-direction: column;
    pointer-events: none;
`;

export const StyledAreaWrapperDiv = styled.div<IAreaWrapperDiv>`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    width: var(--area-row-size);

    ${({ isDisabled }) => isDisabled && stylesAreaWrapperDivDisabled}
`;
