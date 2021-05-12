import styled from 'styled-components/macro';

export const StyledAreaButton = styled.button`
    align-items: center;
    background-color: var(--color-black);
    cursor: pointer;
    display: flex;
    height: var(--global-field-size);
    justify-content: center;
    transition: background-color 0.3s ease;
    width: var(--global-field-size);

    &:hover,
    &:focus {
        background-color: var(--color-1--2);
    }

    svg {
        --svg-size: calc(var(--global-field-size) / 2.4);

        fill: var(--color-white);
        height: var(--svg-size);
        width: var(--svg-size);
    }
`;
