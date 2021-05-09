import styled, { css } from 'styled-components';

import { Owners } from '../../enums';

const { User } = Owners;

interface IStyledShips {
    styledOwner: Owners;
}

const stylesUserShips = css`
    align-items: flex-end;
    left: 0;
    transform: translateX(-100%);
`;

const stylesComputerShips = css`
    align-items: flex-start;
    right: 0;
    transform: translateX(100%);
`;

export const StyledShips = styled.div<IStyledShips>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: -2px 0;
    padding: var(--global-field-size) 10px;
    position: absolute;
    top: 0;

    @media screen and (max-width: 767px) {
        display: none;
    }

    ${({ styledOwner }) => (styledOwner === User ? stylesUserShips : stylesComputerShips)};
`;
