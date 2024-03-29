import styled from 'styled-components/macro';

export const StyledRules = styled.div`
    @media screen and (max-width: 767px) {
        height: 100%;
        overflow: auto;
    }

    > *:first-child {
        margin-top: 0;
    }

    > *:last-child {
        margin-bottom: 0;
    }

    ul {
        margin: 0;
        padding: 0 0 0 20px;
    }

    li {
        align-items: center;
        display: flex;
        line-height: 2;
        position: relative;

        @media screen and (max-width: 767px) {
            display: block;
        }

        &::before {
            background-color: var(--color-white);
            content: '';
            font-size: 20px;
            height: 1px;
            left: -11px;
            margin-right: 7px;
            position: absolute;
            top: 17px;
            width: 5px;
        }
    }

    p {
        margin: 15px 0;
    }
`;

export const StyledRulesTitle = styled.h2`
    margin: 20px 0 10px;
`;

export const StyledRulesIcon = styled.span`
    --svg-size: calc(var(--global-field-size) / 1.5);

    align-items: center;
    background: var(--color-black);
    display: inline-flex;
    height: var(--svg-size);
    justify-content: center;
    margin: 0 5px;
    vertical-align: top;
    width: var(--svg-size);

    @media screen and (max-width: 1279px) {
        --svg-size: calc(var(--global-field-size) / 1);
    }

    @media screen and (max-width: 767px) {
        vertical-align: middle;
    }

    svg {
        fill: var(--color-white);
        height: 50%;
        width: 50%;
    }
`;
