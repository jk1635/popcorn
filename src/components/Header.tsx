import styled from '@emotion/styled';

const Header = () => {
    return (
        <HeaderContainer>
            <Title>Dashboard</Title>
        </HeaderContainer>
    );
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
`;

export default Header;
