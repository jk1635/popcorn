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
        overflow: hidden;
        font-size: 1rem;
        line-height: 1;
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
        border: 0;
    }

    input {
        outline: none;
    }
`;

export default global;
