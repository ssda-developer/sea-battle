import styled, { css } from 'styled-components';

interface IAreaWrapper {
    isDisabled: boolean;
}

const stylesAreaWrapperDisabled = css`
    opacity: 0.8;
    pointer-events: none;

    * {
        opacity: 1;
    }
`;

export const StyledArea = styled.div`
    --area-row-size: calc(var(--global-field-size) * 10);

    position: relative;
    width: 100%;
`;

export const StyledAreaContainer = styled.div`
    background-color: var(--color-1--4);
    display: flex;
    flex-wrap: wrap;
    position: relative;
`;

export const StyledAreaLetters = styled.div`
    padding-left: var(--global-field-size);
    display: flex;
    pointer-events: none;
`;

export const StyledAreaNumbers = styled.div`
    display: flex;
    flex-direction: column;
    pointer-events: none;
`;

export const StyledAreaWrapper = styled.div<IAreaWrapper>`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    width: var(--area-row-size);

    ${({ isDisabled }) => isDisabled && stylesAreaWrapperDisabled}
`;
