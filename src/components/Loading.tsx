import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import SpinnerIcon from '@assets/refresh.svg?react';

const Loading = () => {
    return (
        <CenterContainer>
            <Spinner>
                <SpinnerIcon fill="#123288" />
            </Spinner>
        </CenterContainer>
    );
};

const CenterContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    opacity: 0.26;
    animation: ${rotate} 2s linear infinite;
`;

export default Loading;
