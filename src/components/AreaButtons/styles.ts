import styled from 'styled-components/macro';

export const StyledAreaButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    @media screen and (max-width: 767px) {
        left: 0;
        margin: 0;
        position: absolute;
        top: 0;
        transform: translateY(-100%) translateY(-5px);
    }
`;
