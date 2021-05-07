import styled from 'styled-components';

interface IStyledShipRow {
    styledIsHas: boolean;
}

export const StyledShipRow = styled.div<IStyledShipRow>`
    border: 1px solid var(--color-2--4);
    margin: 3px;
    opacity: ${({ styledIsHas }) => (styledIsHas ? '1' : '0.5')};

    @media screen and (max-width: 1279px) {
        margin: 2px;
    }
`;
