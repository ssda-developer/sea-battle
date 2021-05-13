import styled from 'styled-components/macro';

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
