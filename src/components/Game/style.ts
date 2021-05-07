import styled from 'styled-components';

export const StyledSeaBattleDiv = styled.div`
    --area-row-size: calc(var(--global-field-size) * 10);

    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4%;
    width: 100%;

    @media screen and (max-width: 1439px) {
        --global-field-size: 43px;
    }

    @media screen and (max-width: 1279px) {
        --global-field-size: 26px;

        height: 100vh;
    }

    @media screen and (max-width: 767px) {
        justify-content: flex-start;
        padding: 35px 0;
    }
`;

export const StyledSeaBattleAreasDiv = styled.div`
    align-items: flex-start;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;

    @media screen and (max-width: 767px) {
        display: block;
    }
`;

export const StyledSeaBattleAreaDiv = styled.div`
    margin: 0 20px;
    position: relative;
    width: calc(var(--area-row-size) + var(--global-field-size));

    @media screen and (max-width: 1279px) {
        margin: 0 10px;
    }

    @media screen and (max-width: 767px) {
        margin: 10px auto;
    }
`;
