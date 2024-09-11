import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Title>페이지를 찾을 수 없습니다.</Title>
            <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Title = styled.h1`
    margin-bottom: 3rem;
    font-size: 1.75rem;
    font-weight: 700;
`;

const Button = styled.button`
    padding: 0.75rem 7.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 700;
`;

export default NotFound;
