import styled, { css } from 'styled-components/macro';

interface IField {
    isDisabled: boolean;
}

const stylesFieldDisabled = css`
    opacity: 0.8;
    pointer-events: none;

    * {
        opacity: 1;
    }
`;

export const StyledField = styled.div<IField>`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    width: var(--area-row-size);

    ${({ isDisabled }) => isDisabled && stylesFieldDisabled};
`;
