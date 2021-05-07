import styled from 'styled-components';

export const StyledModal = styled.div`
    align-items: flex-start;
    bottom: 0;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    padding-top: 15vh;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 5000;

    @media screen and (max-width: 1279px) {
        align-items: center;
        padding: 4% 0;
    }

    @media screen and (max-width: 767px) {
        padding: 20% 0;
    }

    &::before {
        background-color: var(--color-black);
        bottom: 0;
        content: '';
        left: 0;
        opacity: 0.5;
        position: absolute;
        right: 0;
        top: 0;
    }
`;

export const StyledModalMessage = styled.div`
    background-color: var(--color-1--3);
    border: 2px solid var(--color-white);
    box-shadow: 0 0 5px 5px rgba(var(--color-black), 0.5);
    color: var(--color-white);
    margin: 0 auto;
    max-width: 98%;
    padding: 35px;
    position: relative;
    text-align: left;
    z-index: 5001;

    @media screen and (max-width: 767px) {
        align-items: center;
        display: flex;
        height: inherit;
        max-height: 100%;
        padding: 15px;
    }
`;
