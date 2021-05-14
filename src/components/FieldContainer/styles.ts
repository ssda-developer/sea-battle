import styled, { css } from 'styled-components/macro';

interface IFieldContainer {
    isDisabled: boolean;
}

const stylesFieldContainerDisabled = css`
    opacity: 0.8;
    pointer-events: none;

    * {
        opacity: 1;
    }
`;

export const StyledFieldContainer = styled.div<IFieldContainer>`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    width: var(--area-row-size);

    ${({ isDisabled }) => isDisabled && stylesFieldContainerDisabled};
`;
