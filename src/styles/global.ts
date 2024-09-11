import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const global = css`
    ${emotionReset};

    * {
        box-sizing: border-box;
    }

    html {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
    }

    body {
        font-family: 'Noto Sans KR', 'Inter', sans-serif;
        font-size: 1rem;
        line-height: 1;
        font-weight: 400;
        background-color: #f4f7fe;
        color: #2b3674;
    }

    html,
    body {
        height: 100%;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
    }

    input:focus {
        outline: none;
    }
`;

export default global;
