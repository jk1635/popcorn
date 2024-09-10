import { useLocation } from 'react-router-dom';

import styled from '@emotion/styled';

const Header = () => {
    const location = useLocation();
    const title = getTitle(location.pathname);

    return (
        <HeaderContainer>
            <Title>{title}</Title>
        </HeaderContainer>
    );
};

const getTitle = pathname => {
    switch (pathname) {
        case '/':
            return 'Dashboard';
        case '/table':
            return 'Table';
        default:
            return 'Page Not Found';
    }
};

const HeaderContainer = styled.header`
    position: fixed;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
    padding: 1.25rem 0 1.25rem 2.5rem;
    font-size: 1.75rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
`;

export default Header;
