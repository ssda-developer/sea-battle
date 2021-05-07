import styled from 'styled-components';

export const StyledAreaAxesCell = styled.div`
    --field-background: var(--color-1--3);
    --field-color: var(--color-white);
    --field-size: calc(var(--global-field-size) - 2px);

    align-items: center;
    background: var(--field-background);
    color: var(--field-color);
    display: flex;
    font-size: 15px;
    height: var(--field-size);
    justify-content: center;
    margin: 1px;
    width: var(--field-size);
`;
